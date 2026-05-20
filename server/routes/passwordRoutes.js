const express = require("express");
const router = express.Router();
const {
  analysePassword,
  checkBreach,
} = require("../controllers/passwordController");

// Public routes — no authentication required
router.post("/analyse", analysePassword);
router.post("/check-breach", checkBreach);

module.exports = router;
