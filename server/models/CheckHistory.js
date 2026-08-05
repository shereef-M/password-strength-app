const mongoose = require("mongoose");

const checkHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CheckHistory", checkHistorySchema);
