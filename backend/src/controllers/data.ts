import { RequestHandler } from "express";
import MakeModel from "../models/make";
import ModelModel from "../models/model";
import { formatRawScraperData } from "../functions/formatRawScraperData";

export const getFormattedData: RequestHandler = async (req, res, next) => {
  try {
    const makes = await MakeModel.find({}).sort({ value: 1 });
    const models = await ModelModel.find({}).sort({ value: 1 });

    const formattedData = formatRawScraperData({ makes, models });
    if (!formattedData) throw new Error("Error formatting raw scraper data");

    res.status(200).json(formattedData);
  } catch (error) {
    next(error);
  }
};
