import { Make } from "../models/make";
import { Model } from "../models/model";
import { DataSite } from "../scraper/types";
import { CombinedTotals, MakeWithModels } from "../utils/types";
type RawScraperData = {
  makes: Make[];
  models: Model[];
};

type FormattedData = {
  autogidasData: MakeWithModels[];
  autopliusData: MakeWithModels[];
  combinedData: CombinedTotals[];
};

export const formatData = (
  makesWithModels: MakeWithModels[],
  combinedData: CombinedTotals[]
): FormattedData => {
  return {
    autogidasData: makesWithModels.filter((e) => {
      return e.dataSite === DataSite.AUTOGIDAS;
    }),
    autopliusData: makesWithModels.filter((e) => {
      return e.dataSite === DataSite.AUTOPLIUS;
    }),
    combinedData,
  };
};
