import { RequestHandler } from "express";
import { dataScrape } from "../scraper/dataScraper/scraper";
import { MakeData, ModelData } from "../scraper/types";
import MakeModel from "../models/make";
import ModelModel from "../models/model";
import mongoose from "mongoose";

export const runScraper: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const rawScraperData = await dataScrape();

    if (!rawScraperData) {
      throw new Error("No data retrieved from scraper");
    }

    await MakeModel.deleteMany({}, { session });
    await ModelModel.deleteMany({}, { session });

    const makes: MakeData[] = [
      ...rawScraperData.autogidasData.makes,
      ...rawScraperData.autopliusData.makes,
    ];
    const commonStrings = ["kita", "other"];
    makes.forEach((e, i) => {
      if (
        commonStrings.some((string) => e.value?.toLowerCase().includes(string))
      ) {
        console.log("some");
        const commonMake = makes.find((el, index) => {
          if (
            index !== i &&
            commonStrings.some((string) =>
              el.value?.toLowerCase().includes(string)
            )
          ) {
            makes[index].commonValue = e.value;
            return el;
          }
        });
        if (commonMake) {
          console.log(e, commonMake);
          makes[i].commonValue = commonMake.value;
        }
      }
      return;
    });
    await MakeModel.insertMany(makes);

    if (!makes || makes.length === 0)
      throw new Error("Failed to insert makes from scraped data");

    const models: ModelData[] = await ModelModel.insertMany([
      ...rawScraperData.autogidasData.models,
      ...rawScraperData.autopliusData.models,
    ]);
    if (!models || models.length === 0)
      throw new Error("Failed to insert models from scraped data");

    await session.commitTransaction();

    res.status(200).json({
      message: "Data updated successfully",
      makesCount: makes.length,
      modelsCount: models.length,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
