import { Make } from "../models/make";
import { Model } from "../models/model";
import { DataSite } from "../scraper/types";
type RawScraperData = {
  makes: Make[];
  models: Model[];
};

type FormattedScraperData = {
  autogidasData: MakeWithModels[];
  autopliusData: MakeWithModels[];
};

type MakeWithModels = {
  make: Make;
  models: Model[];
};

export const formatRawScraperData = ({
  makes,
  models,
}: RawScraperData): FormattedScraperData => {
  const autogidasMakes = makes.filter((e) => {
    return e.dataSite === DataSite.AUTOGIDAS;
  });
  const autopliusMakes = makes.filter((e) => {
    return e.dataSite === DataSite.AUTOPLIUS;
  });

  const autogidasData: MakeWithModels[] = autogidasMakes.map((make) => {
    const associatedModels: Model[] = models.filter((model) => {
      if (
        model.dataSite === DataSite.AUTOGIDAS &&
        model.makeDataValue === make.dataValue
      ) {
        return model;
      }
    });
    return { make, models: associatedModels };
  });

  const autopliusData: MakeWithModels[] = autopliusMakes.map((make) => {
    const associatedModels: Model[] = models.filter((model) => {
      if (
        model.dataSite === DataSite.AUTOPLIUS &&
        model.makeDataValue === make.dataValue
      ) {
        return model;
      }
    });
    return { make, models: associatedModels };
  });
  return {
    autogidasData,
    autopliusData,
  };
};
