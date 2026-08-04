const rateLimit = require("express-rate-limit");

const checkPasswordLimiter = rateLimit({
  windowMs: 60 * 1000, // one minute window
  max: 10, // maximum of 10 requests per window per IP
  message: {
    error: "Too many requests, please try again in one minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = checkPasswordLimiter;
