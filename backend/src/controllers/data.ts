import { RequestHandler } from "express";
import MakeModel from "../models/make";
import ModelModel from "../models/model";
import { formatData } from "../functions/formatData";
import { CombinedTotals, MakeWithModels } from "../utils/types";
import {
  combinedDataPipeline,
  individualSiteDataPipeline,
} from "../utils/pipelines";

export const getFormattedData: RequestHandler = async (req, res, next) => {
  try {
    const individualSiteData: MakeWithModels[] = await MakeModel.aggregate(
      individualSiteDataPipeline
    );
    const combinedData: CombinedTotals[] = await MakeModel.aggregate(
      combinedDataPipeline
    );

    const formattedData = formatData(individualSiteData, combinedData);
    if (!formattedData) throw new Error("Error formatting raw scraper data");

    res.status(200).json(formattedData);
  } catch (error) {
    next(error);
  }
};
