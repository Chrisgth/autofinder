import { DataSite } from "../scraper/dataScraper/types";
import { CombinedTotals, MakeWithModels } from "../utils/types";

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
