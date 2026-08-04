const mongoose = require("mongoose");

const checkHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maskedPassword: {
      type: String,
      required: true,
    },
    breachFound: {
      type: Boolean,
      required: true,
    },
    breachCount: {
      type: Number,
      default: 0,
    },
    strengthScore: {
      type: Number,
      min: 0,
      max: 4,
    },
    strengthLabel: {
      type: String,
      enum: ["Weak", "Fair", "Good", "Strong", "Very Strong"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CheckHistory", checkHistorySchema);
