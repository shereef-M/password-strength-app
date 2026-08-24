const mongoose = require("mongoose");

const explainJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    breachName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "complete", "failed"],
      default: "pending",
    },
    result: { type: String, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ExplainJob", explainJobSchema);
