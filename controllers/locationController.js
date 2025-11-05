import LocationData from "../models/LocationData.js"

// GET latest location data
export const getLocationData = async (req, res) => {
  try {
    const data = await LocationData.find().sort({ createdAt: -1 }).limit(1)
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No location data found" })
    }

    const latest = data[0]
    res.json({
      city: latest.city,
      coords: latest.coords,
      movement: latest.movement,
    })
  } catch (err) {
    console.error("Error fetching location data:", err)
    res.status(500).json({ error: "Server error" })
  }
}

// POST new location data
export const postLocationData = async (req, res) => {
  try {
    const { userId, city, coords, movement } = req.body
    if (!userId || !city || !coords || !movement) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newData = new LocationData({ userId, city, coords, movement })
    await newData.save()
    res.status(201).json({ message: "Location data saved successfully" })
  } catch (err) {
    console.error("Error saving location data:", err)
    res.status(500).json({ error: "Server error" })
  }
}
