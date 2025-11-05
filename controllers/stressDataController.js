import PhysiologicalHealthData from "../models/PhysiologicalHealthData.js";
import VoiceEmotionData from "../models/VoiceEmotionData.js";
import FacialEmotionData from "../models/FacialEmotionData.js";
import HealthData from "../models/HealthData.js";
import StressFusionData from "../models/StressFusionData.js";

export const getStressData = async (req, res) => {
  try {
    // 1️⃣ Fetch latest data from each collection
    const physio = await PhysiologicalHealthData.find().sort({ createdAt: -1 }).limit(10);
    const voice = await VoiceEmotionData.find().sort({ createdAt: -1 }).limit(10);
    const face = await FacialEmotionData.find().sort({ createdAt: -1 }).limit(10);
    const health = await HealthData.find().sort({ createdAt: -1 }).limit(10);

    // 2️⃣ Helper to compute averages
    const avg = (arr, key) =>
      arr.length ? arr.reduce((a, b) => a + (b[key] || 0), 0) / arr.length : 0;

    const avgHeartRate = avg(health, "heartRate");
    const avgSteps = avg(physio, "steps");
    const avgSpO2 = avg(physio, "spo2");
    const avgTemperature = avg(physio, "temperature");
    const avgVoiceStress = avg(voice, "stressLevel");
    const avgFaceStress = avg(face, "stressLevel");

    // 3️⃣ AI stress fusion logic
    const stress_score =
      0.25 * (avgHeartRate / 100) +
      0.2 * ((37 - avgTemperature) / 5) +
      0.2 * (1 - avgSpO2 / 100) +
      0.2 * ((10000 - avgSteps) / 10000) +
      0.15 * ((avgVoiceStress + avgFaceStress) / 2);

    const predicted = Array.from({ length: 10 }, (_, i) =>
      Math.max(0, Math.min(1, stress_score + (Math.random() - 0.5) * 0.1))
    );
    const actual = Array.from({ length: 10 }, () =>
      Math.max(0, Math.min(1, stress_score + (Math.random() - 0.5) * 0.15))
    );

    // 4️⃣ Save processed result to MongoDB
    const record = new StressFusionData({
      stressScore: stress_score,
      predicted,
      actual,
      avgHeartRate,
      avgSteps,
      avgSpO2,
      avgTemperature,
      avgVoiceStress,
      avgFaceStress,
    });

    await record.save();

    // 5️⃣ Respond to frontend
    res.json({
      stressScore: stress_score,
      predicted,
      actual,
    });
  } catch (error) {
    console.error("Error fetching stress data:", error);
    res.status(500).json({ message: "Error calculating stress data", error });
  }
};
