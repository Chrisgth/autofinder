import { Make } from "../../models/make";
import { Model } from "../../models/model";

export type SearchScraperParams = {
  autogidasParams: {
    makeParam: Make | undefined;
    modelParam: Model | undefined;
  };
  autopliusParams: {
    makeParam: Make | undefined;
    modelParam: Model | undefined;
  };
};
