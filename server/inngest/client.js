const { Inngest } = require("inngest");

const inngest = new Inngest({
  id: "passguard-api",
  isDev: true,
});

module.exports = { inngest };
