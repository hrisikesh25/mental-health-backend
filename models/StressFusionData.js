import mongoose from "mongoose";

const stressFusionSchema = new mongoose.Schema(
  {
    stressScore: { type: Number, required: true },
    predicted: { type: [Number], default: [] },
    actual: { type: [Number], default: [] },
    avgHeartRate: { type: Number },
    avgSteps: { type: Number },
    avgSpO2: { type: Number },
    avgTemperature: { type: Number },
    avgVoiceStress: { type: Number },
    avgFaceStress: { type: Number },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const StressFusionData = mongoose.model("StressFusionData", stressFusionSchema);

export default StressFusionData;
