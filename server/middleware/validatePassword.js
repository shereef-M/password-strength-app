const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (typeof password !== "string") {
    return res.status(400).json({ error: "Password must be a string" });
  }
  if (password.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Password can not be empty or white spaces" });
  }
  if (password.length > 128) {
    return res
      .status(400)
      .json({ error: "Password exceeds maximum length of 128 characters" });
  }

  next();
};
module.exports = validatePassword;
