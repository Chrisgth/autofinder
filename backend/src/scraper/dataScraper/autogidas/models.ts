import { DataScraperProps, DataSite, ModelData } from "../../types";
import modelEvaluator, {
  ModelEvaluatorProps,
  ModelEvaluatorType,
} from "./functions/modelEvaluator";
import { acceptAutogidasCookie } from "./functions/acceptCookie";
import autogidasClassStrings from "./utils/classStrings";
import { modelTemplate } from "./utils/templates";

export const getModels = async ({ page }: DataScraperProps) => {
  const { modelClasses, makeClasses } = autogidasClassStrings;
  const makeElements = await page.$$(makeClasses.dropdownOptions);
  const modelData: ModelData[] = [];
  const dataSite = DataSite.AUTOGIDAS;
  await acceptAutogidasCookie(page);

  const overlay = await page.waitForSelector(modelClasses.overlay, {
    visible: false,
    timeout: 5000,
  });
  await overlay?.evaluate((el) => {
    el.remove();
  });

  try {
    for (const element of makeElements) {
      const { valueRecordsCount, makeDataValue } = await element.evaluate(
        (el, modelClasses) => {
          return {
            valueRecordsCount: el.querySelector(modelClasses.valueRecordsCount)
              ?.textContent,
            makeDataValue: el.getAttribute("data-value"),
          };
        },
        modelClasses
      );
      if (valueRecordsCount !== "0" && makeDataValue) {
        const dropdown = await page.waitForSelector(modelClasses.makeDropdown, {
          visible: true,
          timeout: 5000,
        });

        await dropdown?.click();

        await element.scrollIntoView();
        await element.click();

        const modelTemplateStr = `${modelTemplate}`;
        const modelEvaluatorStr = `${modelEvaluator}`;

        const models = await page.$$eval(
          modelClasses.dropdownOptions,
          (
            elements,
            makeDataValue,
            dataSite,
            modelTemplateStr,
            modelEvaluatorStr
          ) =>
            // If there is an element that has the attribute sub-option in the whole array, exclude any regular option that is followed by a suboption
            {
              const modelEvaluatorProps: ModelEvaluatorProps = {
                models: elements,
                dataSite,
                makeDataValue,
                modelTemplateStr,
              };

              const modelEvaluator = new Function(
                "return " + modelEvaluatorStr
              )() as ModelEvaluatorType;

              return modelEvaluator(modelEvaluatorProps);
            },
          makeDataValue,
          dataSite,
          modelTemplateStr,
          modelEvaluatorStr
        );
        await modelData.push(...models);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return modelData;
};
