const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate that all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Please provide username, email, and password",
      });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "An account with this email already exists",
      });
    }

    // Hash the password
    // The number 10 is the salt rounds — higher is more secure but slower
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user in MongoDB
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user
    const token = generateToken(user._id);

    // Send the response
    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// @desc    Login an existing user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        error: "Please provide email and password",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If no user found with that email
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Compare the entered password against the stored hash
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    // Send the response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error during login" });
  }
};

// @desc    Get the currently logged in user's profile
// @route   GET /api/auth/me
// @access  Private (requires JWT)
const getMe = async (req, res) => {
  try {
    // req.user is set by the authMiddleware
    res.status(200).json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("GetMe error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getMe };
