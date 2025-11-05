import dotenv from "dotenv";
import mongoose from "mongoose";
import PhysiologicalHealthData from "./models/PhysiologicalHealthData.js";
import VoiceEmotionData from "./models/VoiceEmotionData.js";
import FacialEmotionData from "./models/FacialEmotionData.js";
import HealthData from "./models/HealthData.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // A fake user ID (replace with real one if needed)
    const fakeUserId = new mongoose.Types.ObjectId();

    // 🧠 Physiological Health Data
    const physio = new PhysiologicalHealthData({
      userId: fakeUserId,
      steps: Math.floor(Math.random() * 10000),
      spo2: 95 + Math.random() * 5,
      temperature: 36 + Math.random(),
    });

    // 🎤 Voice Emotion Data (all required fields)
    const voice = new VoiceEmotionData({
      userId: fakeUserId,
      calm: Math.random().toFixed(2),
      happy: Math.random().toFixed(2),
      angry: Math.random().toFixed(2),
      sad: Math.random().toFixed(2),
      stressLevel: Math.random().toFixed(2),
    });

    // 😐 Facial Emotion Data (added all required fields)
    const face = new FacialEmotionData({
      userId: fakeUserId,
      joy: Math.random().toFixed(2),
      neutral: Math.random().toFixed(2),
      fear: Math.random().toFixed(2),
      disgust: Math.random().toFixed(2),
      surprise: Math.random().toFixed(2),
      stressLevel: Math.random().toFixed(2),
    });

    // ❤️ Health Data
    const health = new HealthData({
      userId: fakeUserId,
      heartRate: 60 + Math.random() * 40,
      bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 10)}`,
    });

    // Save all documents
    await physio.save();
    await voice.save();
    await face.save();
    await health.save();

    console.log("✅ Sample data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
