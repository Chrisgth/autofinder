import { DataSite, ModelData } from "../../types";
import { ModelTemplateType } from "../utils/templates";

export interface ModelEvaluatorProps {
  models: Element[];
  dataSite: DataSite;
  makeDataValue: string;
  modelTemplateStr: string;
}

const modelEvaluator = ({
  models,
  dataSite,
  makeDataValue,
  modelTemplateStr,
}: ModelEvaluatorProps) => {
  const modelTemplate = eval(modelTemplateStr) as ModelTemplateType;

  const suboptionsExist = models.some((e) => {
    return e.classList.contains("sub-option");
  });

  const dataWithListingFormatter = (models: Element[]) => {
    return models.reduce<Array<ModelData>>((data, e) => {
      if (e.getAttribute("data-badge") !== "0") {
        data.push(modelTemplate({ e, dataSite, makeDataValue }));
      }
      return data;
    }, []);
  };
  if (!suboptionsExist) {
    return dataWithListingFormatter(models);
  }
  const filteredArray = models.filter((e, i) => {
    //If it's the final element return it
    if (i === models.length - 1) {
      return e;
    }
    console.log(models[i + 1]);
    console.log(e);
    if (
      e.classList.contains("dropdown-option") &&
      !e.classList.contains("sub-option") &&
      models[i + 1].classList.contains("sub-option")
    ) {
      return;
    }
    return e;
  });
  return dataWithListingFormatter(filteredArray);
};

export type ModelEvaluatorType = typeof modelEvaluator;

export default modelEvaluator;
