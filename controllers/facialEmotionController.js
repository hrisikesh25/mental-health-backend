import FacialEmotionData from "../models/FacialEmotionData.js"

// ✅ GET latest facial emotion data
export const getFacialEmotion = async (req, res) => {
  try {
    const data = await FacialEmotionData.find().sort({ createdAt: -1 }).limit(1)
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No facial emotion data found" })
    }

    const latest = data[0]
    res.json({
      joy: latest.joy,
      neutral: latest.neutral,
      fear: latest.fear,
      disgust: latest.disgust,
      surprise: latest.surprise,
    })
  } catch (err) {
    console.error("Error fetching facial emotion data:", err)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ POST new facial emotion data
export const postFacialEmotion = async (req, res) => {
  try {
    const { userId, joy, neutral, fear, disgust, surprise } = req.body

    const newData = new FacialEmotionData({
      userId,
      joy,
      neutral,
      fear,
      disgust,
      surprise,
    })

    await newData.save()
    res.status(201).json({ message: "Facial emotion data saved successfully" })
  } catch (err) {
    console.error("Error saving facial emotion data:", err)
    res.status(500).json({ error: "Server error" })
  }
}
