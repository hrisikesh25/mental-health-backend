import PhysiologicalHealthData from "../models/PhysiologicalHealthData.js"

// GET latest physiological health data
export const getPhysiologicalHealthData = async (req, res) => {
  try {
    const data = await PhysiologicalHealthData.find().sort({ createdAt: -1 }).limit(1)
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No physiological data found" })
    }

    const latest = data[0]

    // Return in same structure your frontend expects
    const formattedData = latest.temperature.map((temp, i) => ({
      temperature: temp,
      spo2: latest.spo2[i],
      steps: latest.steps[i],
      breathingRate: latest.breathingRate[i],
    }))

    res.json({ data: formattedData })
  } catch (err) {
    console.error("Error fetching physiological health data:", err)
    res.status(500).json({ error: "Server error" })
  }
}

// POST new physiological health data
export const postPhysiologicalHealthData = async (req, res) => {
  try {
    const { userId, temperature, spo2, steps, breathingRate } = req.body

    if (!userId || !temperature || !spo2 || !steps || !breathingRate) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newData = new PhysiologicalHealthData({
      userId,
      temperature,
      spo2,
      steps,
      breathingRate,
    })

    await newData.save()
    res.status(201).json({ message: "Physiological health data saved successfully" })
  } catch (err) {
    console.error("Error saving physiological health data:", err)
    res.status(500).json({ error: "Server error" })
  }
}
