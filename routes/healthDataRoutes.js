import express from "express"
const router = express.Router()

// Example dynamic data (you can replace with DB query)
router.get("/", (req, res) => {
  const data = {
    heartRate: [78, 82, 79, 84, 76, 80, 83, 81],
    sleep: [7, 6.8, 7.5, 6.9, 8, 7.2, 7.8, 7],
    hrv: [65, 70, 68, 72, 66, 71, 69, 70],
  }
  res.json(data)
})

export default router
