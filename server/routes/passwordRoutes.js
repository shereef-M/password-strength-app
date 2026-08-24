const express = require("express");
const router = express.Router();
const {
  analysePassword,
  checkBreach,
} = require("../controllers/passwordController");
const checkPasswordLimiter = require("../middleware/rateLimiter");
const validatePassword = require("../middleware/validatePassword");

// Public routes — no authentication required
router.post(
  "/analyse",
  checkPasswordLimiter,
  validatePassword,
  analysePassword,
);
router.post("/check-breach", checkPasswordLimiter, checkBreach);

module.exports = router;
