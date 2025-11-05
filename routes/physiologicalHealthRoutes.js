import express from "express"
import { getPhysiologicalHealthData, postPhysiologicalHealthData } from "../controllers/physiologicalHealthController.js"

const router = express.Router()

router.get("/", getPhysiologicalHealthData)
router.post("/", postPhysiologicalHealthData)

export default router
