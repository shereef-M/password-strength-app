const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware: parse JSON
app.use(express.json());

// Middleware: CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:3000", "http://localhost:5173"]
        : process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Middleware: rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests from this IP, please try again later",
  },
});
app.use("/api", limiter);

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "PassGuard API is running",
    version: "1.0.0",
    status: "healthy",
  });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const historyRoutes = require("./routes/historyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/history", historyRoutes);

// Handle routes that do not exist
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
