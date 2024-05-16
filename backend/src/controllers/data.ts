import { RequestHandler } from "express";
import MakeModel from "../models/make";
import ModelModel from "../models/model";
import { formatIndividualSiteData } from "../functions/formatIndividualSiteData";
import { MakeWithModels } from "../utils/types";

export const getFormattedData: RequestHandler = async (req, res, next) => {
  try {
    const makesWithModels: MakeWithModels[] = await MakeModel.aggregate([
      {
        $lookup: {
          from: "models",
          let: { makeDataSite: "$dataSite", makeDataValue: "$dataValue" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$dataSite", "$$makeDataSite"] },
                    { $eq: ["$makeDataValue", "$$makeDataValue"] },
                  ],
                },
              },
            },
            {
              $sort: { value: 1 },
            },
          ],
          as: "models",
        },
      },
      {
        $sort: { value: 1 },
      },
    ]);

    const formattedData = formatIndividualSiteData(makesWithModels);
    if (!formattedData) throw new Error("Error formatting raw scraper data");

    res.status(200).json(formattedData);
  } catch (error) {
    next(error);
  }
};
