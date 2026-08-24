const { inngest } = require("../client.js");
const ExplainJob = require("../../models/ExplainJob.js");
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const explainBreach = inngest.createFunction(
  { id: "explain-breach", triggers: { event: "breach/explain.requested" } },
  async ({ event }) => {
    const { jobId, breachName, breachDetails } = event.data;

    try {
      const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: `Explain this data breach in plain, non-technical terms for a general user, including what happened and what they should do: ${breachName}. Details: ${breachDetails}`,
          },
        ],
      });

      await ExplainJob.findByIdAndUpdate(jobId, {
        status: "complete",
        result: response.choices[0].message.content,
      });
    } catch (err) {
      console.error("explainBreach failed:", err);
      await ExplainJob.findByIdAndUpdate(jobId, { status: "failed" });
    }
  },
);

module.exports = { explainBreach };
