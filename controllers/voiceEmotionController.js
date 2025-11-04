import VoiceEmotionData from "../models/VoiceEmotionData.js"

// 🟢 GET latest voice emotion data
export const getVoiceEmotion = async (req, res) => {
  try {
    const data = await VoiceEmotionData.find().sort({ createdAt: -1 }).limit(1)
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No voice emotion data found" })
    }

    const latest = data[0]
    res.json({
      calm: latest.calm,
      happy: latest.happy,
      angry: latest.angry,
      sad: latest.sad,
    })
  } catch (err) {
    console.error("Error fetching voice emotion data:", err)
    res.status(500).json({ error: "Server error" })
  }
}

// 🟣 POST new voice emotion data
export const postVoiceEmotion = async (req, res) => {
  try {
    const { userId, calm, happy, angry, sad } = req.body

    if (!userId || calm == null || happy == null || angry == null || sad == null) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newData = new VoiceEmotionData({ userId, calm, happy, angry, sad })
    await newData.save()
    res.status(201).json({ message: "Voice emotion data saved successfully" })
  } catch (err) {
    console.error("Error saving voice emotion data:", err)
    res.status(500).json({ error: "Server error" })
  }
}
