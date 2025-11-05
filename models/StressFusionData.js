// models/StressFusionData.js
import mongoose from "mongoose";

const stressFusionSchema = new mongoose.Schema({
  stressScore: Number,
  predicted: [Number],
  actual: [Number],
  avgHeartRate: Number,
  avgSteps: Number,
  avgSpO2: Number,
  avgTemperature: Number,
  avgVoiceStress: Number,
  avgFaceStress: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("StressFusionData", stressFusionSchema);
