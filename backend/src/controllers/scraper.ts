import { RequestHandler } from "express";
import { dataScrape } from "../scraper/dataScraper/scraper";
import { DataSite, MakeData, ModelData } from "../scraper/dataScraper/types";
import MakeModel from "../models/make";
import ModelModel, { Model } from "../models/model";
import mongoose from "mongoose";
import { findCommonValues } from "../functions/findCommonValues";
import createHttpError from "http-errors";
import { SearchScraperBody } from "../utils/types";

let scraperIsRunning = false;

export const runDataScraper: RequestHandler = async (req, res, next) => {
  if (scraperIsRunning) {
    return res
      .status(429)
      .send("Another request is being processed. Please try again later.");
  }
  scraperIsRunning = true;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const rawScraperData = await dataScrape();

    if (!rawScraperData) {
      throw createHttpError(404, "No data retrieved from scraper");
    }

    await MakeModel.deleteMany({}, { session });
    await ModelModel.deleteMany({}, { session });
    const makes: MakeData[] = [
      ...rawScraperData.autogidasData.makes,
      ...rawScraperData.autopliusData.makes,
    ];
    findCommonValues(makes);
    await MakeModel.insertMany(makes);

    if (!makes || makes.length === 0)
      throw createHttpError(400, "Failed to insert makes from scraped data");

    const models: ModelData[] = [
      ...rawScraperData.autogidasData.models,
      ...rawScraperData.autopliusData.models,
    ];
    findCommonValues(models);

    await ModelModel.insertMany(models);
    if (!models || models.length === 0)
      throw createHttpError(400, "Failed to insert models from scraped data");

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
  scraperIsRunning = false;
};

export const runSearchScraper: RequestHandler<
  unknown,
  unknown,
  SearchScraperBody,
  unknown
> = async (req, res, next) => {
  const { makeValue, modelValue } = req.body;
  try {
    let modelData;
    const makeData = await MakeModel.find({
      $or: [{ value: makeValue }, { commonValue: makeValue }],
    });
    if (!makeData || !makeData.length)
      throw createHttpError(
        404,
        "No makes found with given value within scraped data"
      );

    const autogidasMakeData = makeData.find(
      (data) => data.dataSite === DataSite.AUTOGIDAS
    );
    const autopliusMakeData = makeData.find(
      (data) => data.dataSite === DataSite.AUTOPLIUS
    );

    if (modelValue) {
      modelData = await ModelModel.find({
        $or: [
          { value: modelValue, makeDataValue: autogidasMakeData?.dataValue },
          {
            commonValue: modelValue,
            makeDataValue: autogidasMakeData?.dataValue,
          },
          { value: modelValue, makeDataValue: autopliusMakeData?.dataValue },
          {
            commonValue: modelValue,
            makeDataValue: autopliusMakeData?.dataValue,
          },
        ],
      });
      if (!modelData || !modelData.length)
        throw createHttpError(
          404,
          "No models found with given value within scraped data"
        );
    }
    res.status(200).json({
      body: req.body,
      makes: makeData,
      models: modelData,
    });
  } catch (error) {
    next(error);
  }
};
