import { Make } from "../models/make";
import { Model } from "../models/model";
import { DataSite } from "../scraper/types";
import { MakeWithModels } from "../utils/types";
type RawScraperData = {
  makes: Make[];
  models: Model[];
};

type CompiledData = {
  autogidasData: MakeWithModels[];
  autopliusData: MakeWithModels[];
  combinedData?: MakeWithModels[];
};

export const formatIndividualSiteData = (
  makesWithModels: MakeWithModels[]
): CompiledData => {
  return {
    autogidasData: makesWithModels.filter((e) => {
      return e.dataSite === DataSite.AUTOGIDAS;
    }),
    autopliusData: makesWithModels.filter((e) => {
      return e.dataSite === DataSite.AUTOPLIUS;
    }),
  };
};
