import express from "express"
import { getVoiceEmotion, postVoiceEmotion } from "../controllers/voiceEmotionController.js"

const router = express.Router()

// GET latest data
router.get("/", getVoiceEmotion)

// POST new data
router.post("/", postVoiceEmotion)

export default router
