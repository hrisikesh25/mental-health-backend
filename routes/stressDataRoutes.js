import express from "express";
import { getStressData } from "../controllers/stressFusionController.js";

const router = express.Router();
router.get("/stressdata", getStressData);
export default router;
