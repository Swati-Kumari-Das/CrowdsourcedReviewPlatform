const rateLimit = require("express-rate-limit");

// Limit login/register
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,
  message: "Too many requests, try again later",
});

// Limit reviews (important)
exports.reviewLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 5,
  message: "Too many reviews submitted, slow down",
});