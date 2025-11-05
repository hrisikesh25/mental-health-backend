import mongoose from "mongoose";

const PhysiologicalHealthDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  steps: Number,
  spo2: Number,
  temperature: Number,
}, { timestamps: true });

const PhysiologicalHealthData = mongoose.model("PhysiologicalHealthData", PhysiologicalHealthDataSchema);

export default PhysiologicalHealthData;
