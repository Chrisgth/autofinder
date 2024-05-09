import { RequestHandler } from "express";
import { dataScrape } from "../scraper/dataScraper/scraper";
import { MakeData, ModelData } from "../scraper/types";
import MakeModel from "../models/make";
import ModelModel from "../models/model";
export const runScraper: RequestHandler = async (req, res, next) => {
  try {
    const rawScraperData = await dataScrape();
    if (rawScraperData) {
      const makes: MakeData[] = await MakeModel.insertMany([
        ...rawScraperData.autogidasData.makes,
        ...rawScraperData.autopliusData.makes,
      ]);
      if (!makes) throw new Error("Failed to insert makes from scraped data");

      const models: ModelData[] = await ModelModel.insertMany([
        ...rawScraperData.autogidasData.models,
        ...rawScraperData.autopliusData.models,
      ]);
      if (!models) throw new Error("Failed to insert models from scraped data");
    }
    // res.status(200).json(searches);
  } catch (error) {
    next(error);
  }
};
