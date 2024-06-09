import express from "express";
import * as ScraperController from "../controllers/scraper";

const router = express.Router();

router.get("/runDataScraper", ScraperController.runDataScraper);

router.get("/runSearchScraper", ScraperController.runSearchScraper);

export default router;
