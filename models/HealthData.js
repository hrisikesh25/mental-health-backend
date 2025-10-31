import mongoose from "mongoose"

const healthDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  heartRate: [Number],
  sleep: [Number],
  hrv: [Number],
  createdAt: { type: Date, default: Date.now }
})

const HealthData = mongoose.model("HealthData", healthDataSchema)
export default HealthData
