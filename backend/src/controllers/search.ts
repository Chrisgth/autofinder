import { RequestHandler } from "express";
import SearchModel from "../models/search";

export const getSearches: RequestHandler = async (req, res, next) => {
  try {
    const searches = await SearchModel.find().exec();
    res.status(200).json(searches);
  } catch (error) {
    next(error);
  }
};

export const insertSearch: RequestHandler = async (req, res, next) => {
  try {
    const newSearch = await SearchModel.create({
      make: "Volvo",
      model: "V70",
    });

    if (!newSearch) throw Error("Failed to create new search");

    res.status(200).json(newSearch);
  } catch (error) {
    next(error);
  }
};
