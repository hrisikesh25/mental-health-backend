import PhysiologicalHealthData from "../models/PhysiologicalHealthData.js";
import VoiceEmotionData from "../models/VoiceEmotionData.js";
import FacialEmotionData from "../models/FacialEmotionData.js";
import HealthData from "../models/HealthData.js";

export const getStressData = async (req, res) => {
  try {
    // 1️⃣ Fetch the latest entry from each collection
    const physio = await PhysiologicalHealthData.findOne().sort({ createdAt: -1 });
    const voice = await VoiceEmotionData.findOne().sort({ createdAt: -1 });
    const face = await FacialEmotionData.findOne().sort({ createdAt: -1 });
    const health = await HealthData.findOne().sort({ createdAt: -1 });

    if (!physio || !voice || !face || !health) {
      return res.status(404).json({ message: "Incomplete data in MongoDB" });
    }

    // 2️⃣ Helper function for averaging arrays
    const avg = (arr = []) =>
      Array.isArray(arr) && arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    // 3️⃣ Physiological and health parameters
    const avgHeart = avg(health.heartRate);
    const avgHRV = avg(health.hrv);
    const avgSleep = avg(health.sleep);
    const avgTemp = avg(physio.temperature);
    const avgSpO2 = avg(physio.spo2);
    const avgSteps = avg(physio.steps);
    const avgBreathing = avg(physio.breathingRate);
    const avgMovement = avg(health.movement);

    // 4️⃣ Emotions (Facial + Voice)
    const { joy, neutral, fear, disgust, surprise } = face;
    const { calm, happy, angry, sad } = voice;

    // Calculate emotion-based stress
    const faceStress = (fear + disgust + surprise + neutral) - joy;
    const voiceStress = (angry + sad) - (happy + calm);

    // 5️⃣ Weighted stress score formula (similar to your FastAPI logic)
    let stressScore =
      0.15 * ((avgHeart - 60) / 60) +
      0.10 * (1 - avgHRV / 100) +
      0.10 * ((7 - avgSleep) / 7) +
      0.05 * ((avgTemp - 36.5) / 2) +
      0.05 * (1 - avgSpO2 / 100) +
      0.05 * ((avgBreathing - 15) / 10) +
      0.10 * ((10000 - avgSteps) / 10000) +
      0.05 * ((5 - avgMovement) / 5) +
      0.20 * faceStress +
      0.15 * voiceStress;

    // Normalize between 0–1
    stressScore = Math.max(0, Math.min(1, stressScore));

    // 6️⃣ Generate mock chart data for frontend
    const randomAround = (val, variance) =>
      Math.max(0, Math.min(1, val + (Math.random() - 0.5) * variance));

    const predicted = Array.from({ length: 10 }, () => randomAround(stressScore, 0.05));
    const actual = Array.from({ length: 10 }, () => randomAround(stressScore, 0.03));

    // 7️⃣ Return response
    res.json({
      stressScore: Number(stressScore.toFixed(3)),
      predicted,
      actual,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error fetching stress data:", error);
    res.status(500).json({ message: "Error calculating stress data", error });
  }
};
