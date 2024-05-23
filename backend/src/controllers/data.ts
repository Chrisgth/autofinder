import { RequestHandler } from "express";
import MakeModel, { Make } from "../models/make";
import ModelModel, { Model } from "../models/model";
import { formatData } from "../functions/formatData";
import {
  CombinedTotals,
  CommonValuesUpdateBody,
  MakeWithModels,
  SchemaType,
} from "../utils/types";
import {
  combinedDataPipeline,
  individualSiteDataPipeline,
} from "../utils/pipelines";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getFormattedData: RequestHandler = async (req, res, next) => {
  try {
    const individualSiteData: MakeWithModels[] = await MakeModel.aggregate(
      individualSiteDataPipeline
    );

    const combinedData: CombinedTotals[] = await MakeModel.aggregate(
      combinedDataPipeline
    );

    const formattedData = formatData(individualSiteData, combinedData);
    if (!formattedData)
      createHttpError(500, "Error formatting raw scraper data");

    res.status(200).json(formattedData);
  } catch (error) {
    next(error);
  }
};
export const updateCommonValues: RequestHandler<
  unknown,
  unknown,
  CommonValuesUpdateBody[],
  unknown
> = async (req, res, next) => {
  try {
    const updates = req.body;

    if (!updates) createHttpError(400, "Bad request, invalid update body data");

    const updatedObjects: (Make | Model)[] = [];

    for (const update of updates) {
      const { id, updateData, schemaType } = update;
      const { commonValue, primary } = updateData;

      if (!mongoose.isValidObjectId(id))
        throw createHttpError(400, "Invalid Object ID");

      if (!commonValue || primary === undefined)
        throw createHttpError(
          400,
          "Updating an objects common value requires the common value itself and whether the object is primary or not"
        );

      const object =
        schemaType === SchemaType.MODEL
          ? await ModelModel.findById(id).exec()
          : await MakeModel.findById(id).exec();

      if (!object) throw createHttpError(404, "Object not found");

      object.commonValue = commonValue;
      object.primary = primary;

      const updatedObject = await object.save();
      updatedObjects.push(updatedObject);
    }
    if (!updatedObjects || updatedObjects.length < 2)
      throw createHttpError(500, "Failed to update objects");
    res.status(200).json(updatedObjects);
  } catch (error) {
    next(error);
  }
};
