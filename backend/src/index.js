import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// Use Helmet middleware for setting various HTTP headers for security
app.use(helmet());

// Use CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount authentication routes at /api/auth path
app.use("/api/auth", authRoutes);

// basic root route for testing if the server is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  // Send a 500 Internal Server Error response with a generic message
  res.status(500).json({ message: "Server error" });
});

// Define the port to listen on (default to 5000 if not specified in env)
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
