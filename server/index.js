const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const { serve } = require("inngest/express");
const { inngest } = require("./inngest/client");
const { explainBreach } = require("./inngest/functions/explainBreach");
const breachExplainRouter = require("./routes/breachExplain");

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();
app.set("trust proxy", 1);

// Middleware: parse JSON
app.use(express.json());

// Middleware: CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://passguard-three.vercel.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  }),
);

app.use("/api/inngest", serve({ client: inngest, functions: [explainBreach] }));
app.use("/api/breach", breachExplainRouter);

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
