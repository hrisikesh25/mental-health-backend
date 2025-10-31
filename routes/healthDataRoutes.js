import express from "express"
import HealthData from "../models/HealthData.js"

const router = express.Router()

// GET all health data
router.get("/", async (req, res) => {
  try {
    const data = await HealthData.find().sort({ createdAt: -1 }).limit(1) // get latest
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No health data found" })
    }

    const latest = data[0]
    res.json({
      heartRate: latest.heartRate,
      sleep: latest.sleep,
      hrv: latest.hrv,
    })
  } catch (err) {
    console.error("Error fetching health data:", err)
    res.status(500).json({ error: "Server error" })
  }
})

// (Optional) POST route to add new health data
router.post("/", async (req, res) => {
  try {
    const { userId, heartRate, sleep, hrv } = req.body
    const newData = new HealthData({ userId, heartRate, sleep, hrv })
    await newData.save()
    res.status(201).json({ message: "Health data saved successfully" })
  } catch (err) {
    console.error("Error saving health data:", err)
    res.status(500).json({ error: "Server error" })
  }
})

export default router
