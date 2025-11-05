import mongoose from "mongoose"

const physiologicalHealthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  temperature: [Number],     // in °C
  spo2: [Number],            // in %
  steps: [Number],           // step count
  breathingRate: [Number],   // breaths per minute
  createdAt: { type: Date, default: Date.now }
})

const PhysiologicalHealthData = mongoose.model("PhysiologicalHealthData", physiologicalHealthSchema)
export default PhysiologicalHealthData
