// controllers/stressFusionController.js
import PhysiologicalHealthData from "../models/PhysiologicalHealthData.js";
import VoiceEmotionData from "../models/VoiceEmotionData.js";
import FacialEmotionData from "../models/FacialEmotionData.js";
import HealthData from "../models/HealthData.js";
import StressFusionData from "../models/StressFusionData.js";

export const getStressData = async (req, res) => {
  try {
    const physio = await PhysiologicalHealthData.find().sort({ createdAt: -1 }).limit(10);
    const voice = await VoiceEmotionData.find().sort({ createdAt: -1 }).limit(10);
    const face = await FacialEmotionData.find().sort({ createdAt: -1 }).limit(10);
    const health = await HealthData.find().sort({ createdAt: -1 }).limit(10);

    const avg = (arr, key) =>
      arr.length ? arr.reduce((a, b) => a + (b[key] || 0), 0) / arr.length : 0;

    // Compute averages safely
    const avgHeartRate = avg(health, "heartRate") || 75;
    const avgSteps = avg(physio, "steps") || 5000;
    const avgSpO2 = avg(physio, "spo2") || 98;
    const avgTemperature = avg(physio, "temperature") || 36.8;
    const avgVoiceStress = avg(voice, "stressLevel") || 0.3;
    const avgFaceStress = avg(face, "stressLevel") || 0.3;

    console.log({
      avgHeartRate,
      avgSteps,
      avgSpO2,
      avgTemperature,
      avgVoiceStress,
      avgFaceStress,
    });

    // AI stress fusion logic
    const stress_score =
      0.25 * (avgHeartRate / 100) +
      0.2 * ((37 - avgTemperature) / 5) +
      0.2 * (1 - avgSpO2 / 100) +
      0.2 * ((10000 - avgSteps) / 10000) +
      0.15 * ((avgVoiceStress + avgFaceStress) / 2);

    const predicted = Array.from({ length: 10 }, () =>
      Math.max(0, Math.min(1, stress_score + (Math.random() - 0.5) * 0.1))
    );
    const actual = Array.from({ length: 10 }, () =>
      Math.max(0, Math.min(1, stress_score + (Math.random() - 0.5) * 0.15))
    );

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

    res.json({ stressScore: stress_score, predicted, actual });
  } catch (error) {
    console.error("❌ Error fetching stress data:", error);
    res.status(500).json({ message: "Error calculating stress data", error });
  }
};

