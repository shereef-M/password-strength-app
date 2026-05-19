const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      // Header format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database using the ID from the token
      // .select('-password') means fetch everything EXCEPT the password field
      req.user = await User.findById(decoded.id).select("-password");

      // Pass control to the next function (the actual route handler)
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, token is invalid" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
