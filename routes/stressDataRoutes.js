import express from "express";
import { getStressData } from "../controllers/stressDataController.js";

const router = express.Router();

router.get("/stress-data", getStressData);

export default router;
