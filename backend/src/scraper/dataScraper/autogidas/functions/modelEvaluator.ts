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
    return e.classList.contains("sub");
  });

  const dataWithListingFormatter = (models: Element[]) => {
    return models.reduce<Array<ModelData>>((data, e) => {
      if (
        e.querySelector(".value-records-count")?.textContent !== "0" &&
        !e.getAttribute("data-title")?.includes("Visi ")
      ) {
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
    if (
      e.classList.contains("main") &&
      !e.classList.contains("sub") &&
      models[i + 1].classList.contains("sub")
    ) {
      return;
    }
    return e;
  });
  return dataWithListingFormatter(filteredArray);
};

export type ModelEvaluatorType = typeof modelEvaluator;

export default modelEvaluator;
