import mongoose from "mongoose"

const voiceEmotionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  calm: { type: Number, required: true },
  happy: { type: Number, required: true },
  angry: { type: Number, required: true },
  sad: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

const VoiceEmotionData = mongoose.model("VoiceEmotionData", voiceEmotionSchema)
export default VoiceEmotionData
