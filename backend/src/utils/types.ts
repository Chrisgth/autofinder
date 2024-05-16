import { Make } from "../models/make";
import { Model } from "../models/model";

export interface MakeWithModels extends Make {
  models: Model[];
}
