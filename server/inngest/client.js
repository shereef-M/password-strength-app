const { Inngest } = require("inngest");

const inngest = new Inngest({
  id: "passguard-api",
  isDev: process.env.NODE_ENV !== "production",
});

module.exports = { inngest };
