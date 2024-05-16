import { Document } from "mongoose";
import { Make } from "../models/make";
import { Model } from "../models/model";

export interface MakeWithModels extends Make {
  models: Model[];
}
type ModelTotals = {
  value: string;
  totalCount: number;
};
export interface CombinedTotals extends Document {
  value: string;
  totalCount: number;
  models: ModelTotals[];
}
