import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import healthDataRoutes from "./routes/healthDataRoutes.js"

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "*", // allow all for ngrok testing
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/healthdata", healthDataRoutes)

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
