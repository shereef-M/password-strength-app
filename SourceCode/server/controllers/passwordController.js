const zxcvbn = require("zxcvbn");
const crypto = require("crypto");
const axios = require("axios");
const CheckHistory = require("../models/CheckHistory");

// Helper function to mask a password for storage
// "sunshine123" becomes "su*********3"
const maskPassword = (password) => {
  if (password.length <= 2) return "*".repeat(password.length);
  return (
    password[0] +
    "*".repeat(password.length - 2) +
    password[password.length - 1]
  );
};

// Helper function to get a human readable label from zxcvbn score
const getStrengthLabel = (score) => {
  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  return labels[score];
};

// @desc    Analyse password strength
// @route   POST /api/password/analyse
// @access  Public
const analysePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Run zxcvbn analysis
    const result = zxcvbn(password);

    // Build a clean response from the zxcvbn result
    const response = {
      score: result.score,
      label: getStrengthLabel(result.score),
      crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
      feedback: {
        warning: result.feedback.warning || null,
        suggestions: result.feedback.suggestions || [],
      },
      stats: {
        guesses: result.guesses,
        guessesLog10: result.guesses_log10,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Analyse password error:", error.message);
    res.status(500).json({ error: "Server error during password analysis" });
  }
};

// @desc    Check if password has been breached using HIBP API with k-Anonymity
// @route   POST /api/password/check-breach
// @access  Public (but saves history if user is logged in)
const checkBreach = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Step 1: Generate SHA-1 hash of the password
    const sha1Hash = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex")
      .toUpperCase();

    // Step 2: Split into prefix (first 5 chars) and suffix (remaining chars)
    const prefix = sha1Hash.substring(0, 5);
    const suffix = sha1Hash.substring(5);

    // Step 3: Send ONLY the prefix to HIBP API
    const hibpResponse = await axios.get(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        headers: {
          // This header tells HIBP we are implementing k-Anonymity padding
          "Add-Padding": "true",
        },
        timeout: 5000,
      },
    );

    // Step 4: Parse the response
    // HIBP returns lines in format: "SUFFIX:COUNT"
    const hashes = hibpResponse.data.split("\n");

    // Step 5: Check locally if our suffix appears in the list
    let breachCount = 0;
    for (const hash of hashes) {
      const [hashSuffix, count] = hash.split(":");
      if (hashSuffix.trim() === suffix) {
        breachCount = parseInt(count.trim());
        break;
      }
    }

    const breachFound = breachCount > 0;

    // Step 6: Also run strength analysis
    const strengthResult = zxcvbn(password);

    // Step 7: Save to history if user is authenticated
    // We check for an auth token but do not require it
    let historySaved = false;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      try {
        const jwt = require("jsonwebtoken");
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await CheckHistory.create({
          userId: decoded.id,
          maskedPassword: maskPassword(password),
          breachFound,
          breachCount,
          strengthScore: strengthResult.score,
          strengthLabel: getStrengthLabel(strengthResult.score),
        });
        historySaved = true;
      } catch (tokenError) {
        // Token was invalid but we still return the breach result
        // We just do not save history
        console.log(
          "Token invalid — breach check performed without saving history",
        );
      }
    }

    // Step 8: Send the response
    res.status(200).json({
      breachFound,
      breachCount,
      message: breachFound
        ? `⚠️ This password was found in ${breachCount.toLocaleString()} data breaches`
        : "✅ This password was not found in any known data breaches",
      strength: {
        score: strengthResult.score,
        label: getStrengthLabel(strengthResult.score),
      },
      historySaved,
    });
  } catch (error) {
    // Handle HIBP API being unavailable
    if (error.code === "ECONNABORTED" || error.response?.status >= 500) {
      return res.status(503).json({
        error:
          "Breach checking service is temporarily unavailable. Please try again later.",
      });
    }
    console.error("Breach check error:", error.message);
    res.status(500).json({ error: "Server error during breach check" });
  }
};

module.exports = { analysePassword, checkBreach };
