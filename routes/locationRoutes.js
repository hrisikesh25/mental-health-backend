import express from "express"
import { getLocationData, postLocationData } from "../controllers/locationController.js"

const router = express.Router()

router.get("/", getLocationData)
router.post("/", postLocationData)

export default router
