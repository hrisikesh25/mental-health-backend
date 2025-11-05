import mongoose from "mongoose"

const locationDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  city: { type: String, required: true },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  movement: [Number], // distance travelled or movement tracking
  createdAt: { type: Date, default: Date.now },
})

const LocationData = mongoose.model("LocationData", locationDataSchema)
export default LocationData
