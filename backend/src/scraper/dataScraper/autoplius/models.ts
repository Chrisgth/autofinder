import { DataScraperProps, DataSite, ModelData } from "../../types";
import modelEvaluator, {
  ModelEvaluatorProps,
  ModelEvaluatorType,
} from "./functions/modelEvaluator";
import autopliusClassStrings from "./utils/classStrings";
import { modelTemplate } from "./utils/templates";
import { declineAutopliusCookie } from "./functions/declineCookie";
autopliusClassStrings;

const { modelClasses, makeClasses } = autopliusClassStrings;

export const getModels = async ({ page }: DataScraperProps) => {
  // Datasite is seperated and passed as an argument because puppeteer runs into issues if done internally
  const dataSite = DataSite.AUTOPLIUS;
  const makeElements = await page.$$(makeClasses.dropdownOptions);
  const modelData: ModelData[] = [];

  declineAutopliusCookie(page);

  const dropdown = await page.waitForSelector(modelClasses.makeDropdown);

  try {
    for (const element of makeElements) {
      const { dataBadge, makeDataValue } = await element.evaluate((el) => {
        return {
          dataBadge: el.getAttribute("data-badge"),
          makeDataValue: el.getAttribute("data-value"),
        };
      });

      if (dataBadge !== "0" && makeDataValue) {
        // console.log(dataBadge);
        await dropdown?.click();

        await element.scrollIntoView();
        await element.click();

        const overlay = await page.waitForSelector(modelClasses.overlay, {
          visible: true,
          timeout: 5000,
        });

        await overlay?.click();

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

              const modelEvaluator = eval(
                modelEvaluatorStr
              ) as ModelEvaluatorType;

              return modelEvaluator(modelEvaluatorProps);
            },
          makeDataValue,
          dataSite,
          modelTemplateStr,
          modelEvaluatorStr
        );
        await modelData.push(...models);

        const clear = await page.waitForSelector(modelClasses.clearButton);

        await clear?.click();
      }
    }
  } catch (error) {
    console.error("Error in model fetching loop:", error);
  }

  return modelData;
};
