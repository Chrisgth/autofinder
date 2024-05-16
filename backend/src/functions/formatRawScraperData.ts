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
  const filterByDataSite = (dataSite: DataSite) =>
    makes.filter((e) => e.dataSite === dataSite);

  const autogidasMakes = filterByDataSite(DataSite.AUTOGIDAS);
  const autopliusMakes = filterByDataSite(DataSite.AUTOPLIUS);

  const mergeModelsWithMakes = (fiteredMakes: Make[], dataSite: DataSite) => {
    return fiteredMakes.map((make) => {
      const associatedModels: Model[] = models.filter((model) => {
        if (
          model.dataSite === dataSite &&
          model.makeDataValue === make.dataValue
        ) {
          return model;
        }
      });
      return { make, models: associatedModels };
    });
  };
  const autogidasData = mergeModelsWithMakes(
    autogidasMakes,
    DataSite.AUTOGIDAS
  );
  const autopliusData = mergeModelsWithMakes(
    autopliusMakes,
    DataSite.AUTOGIDAS
  );
  return {
    autogidasData,
    autopliusData,
  };
};
