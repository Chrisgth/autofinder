import express from "express";
import * as ScraperController from "../controllers/scraper";

const router = express.Router();

router.get("/run", ScraperController.runScraper);

export default router;
