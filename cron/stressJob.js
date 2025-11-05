// cron/stressJob.js
import cron from "node-cron";
import { getStressData } from "../controllers/stressFusionController.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("⏳ Running automatic stress fusion update...");
  try {
    // Call directly without fetch
    await getStressData(
      { body: {}, query: {}, params: {} },
      { json: console.log, status: () => ({ json: console.log }) }
    );
  } catch (error) {
    console.error("[CRON ERROR]", error);
  }
});
