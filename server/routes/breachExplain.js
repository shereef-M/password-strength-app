const express = require("express");
const ExplainJob = require("../models/ExplainJob.js");
const { inngest } = require("../inngest/client.js");
const authenticate = require("../middleware/authMiddleware.js"); // ⚠️ check export name below
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/explain", protect, async (req, res) => {
  const { breachName, breachDetails } = req.body;

  const job = await ExplainJob.create({ userId: req.user.id, breachName });

  await inngest.send({
    name: "breach/explain.requested",
    data: { jobId: job._id.toString(), breachName, breachDetails },
  });

  res.status(202).json({ jobId: job._id });
});

router.get("/explain/:jobId", protect, async (req, res) => {
  const job = await ExplainJob.findById(req.params.jobId);

  if (!job) return res.status(404).json({ error: "Job not found" });
  if (job.userId.toString() !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  res.json({ status: job.status, result: job.result });
});

module.exports = router;
