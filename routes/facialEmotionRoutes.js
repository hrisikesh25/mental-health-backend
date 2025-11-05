import express from "express"
import {
  getFacialEmotion,
  postFacialEmotion,
} from "../controllers/facialEmotionController.js"

const router = express.Router()

// GET latest data
router.get("/", getFacialEmotion)

// POST new data
router.post("/", postFacialEmotion)

export default router
