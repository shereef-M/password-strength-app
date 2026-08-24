const mongoose = require("mongoose");

const explanationSchema = new mongoose.Schema(
  {
    maskedPassword: { type: String, required: true },
    breachCount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "done", "failed"],
      default: "pending",
    },
    explanation: { type: String, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Explanation", explanationSchema);


