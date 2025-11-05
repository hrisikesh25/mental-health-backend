import mongoose from "mongoose"

const facialEmotionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  joy: { type: Number, required: true },
  neutral: { type: Number, required: true },
  fear: { type: Number, required: true },
  disgust: { type: Number, required: true },
  surprise: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

const FacialEmotionData = mongoose.model("FacialEmotionData", facialEmotionSchema)
export default FacialEmotionData
