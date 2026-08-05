const zxcvbn = require("zxcvbn");
const crypto = require("crypto");
const axios = require("axios");
const CheckHistory = require("../models/CheckHistory");

// Helper function to mask a password for storage
// "sunshine123" becomes "s*********3"
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
    const { hash } = req.body;

    if (!hash) {
      return res.status(400).json({ error: "Password hash is required" });
    }

    // Step 1: Split the incoming hash into prefix (first 5 chars) and suffix
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    // Step 2: Send ONLY the prefix to HIBP API
    const hibpResponse = await axios.get(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        headers: {
          "Add-Padding": "true",
        },
        timeout: 5000,
      },
    );

    // Step 3: Parse the response
    const hashes = hibpResponse.data.split("\n");

    // Step 4: Check locally if our suffix appears in the list
    let breachCount = 0;
    for (const h of hashes) {
      const [hashSuffix, count] = h.split(":");
      if (hashSuffix.trim() === suffix) {
        breachCount = parseInt(count.trim());
        break;
      }
    }

    const breachFound = breachCount > 0;

    // Step 5: Save to history if user is authenticated
    let historySaved = false;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      try {
        const jwt = require("jsonwebtoken");
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await CheckHistory.create({
          userId: decoded.id,
          breachFound,
          breachCount,
        });
        historySaved = true;
      } catch (tokenError) {
        console.log(
          "Token invalid — breach check performed without saving history",
        );
      }
    }

    // Step 6: Send the response
    res.status(200).json({
      breachFound,
      breachCount,
      message: breachFound
        ? `⚠️ This password was found in ${breachCount.toLocaleString()} data breaches`
        : "✅ This password was not found in any known data breaches",
      historySaved,
    });
  } catch (error) {
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
module.exports = { analysePassword, checkBreach, maskPassword };