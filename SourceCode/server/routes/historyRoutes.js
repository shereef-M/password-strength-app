const express = require("express");
const router = express.Router();
const {
  getHistory,
  deleteHistory,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

// All history routes require authentication
router.get("/", protect, getHistory);
router.delete("/:id", protect, deleteHistory);

module.exports = router;
