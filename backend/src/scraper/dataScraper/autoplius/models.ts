import { DataScraperProps, DataSite, ModelData } from "../../types";
import modelEvaluator, {
  ModelEvaluatorProps,
  ModelEvaluatorType,
} from "./functions/modelEvaluator";
import autopliusClassStrings from "./utils/classStrings";
import { modelTemplate } from "./utils/templates";
autopliusClassStrings;

export const getModels = async ({ page }: DataScraperProps) => {
  // Datasite is seperated and passed as an argument because puppeteer runs into issues if done internally
  const { modelClasses, makeClasses } = autopliusClassStrings;
  const dataSite = DataSite.AUTOPLIUS;
  const makeElements = await page.$$(makeClasses.dropdownOptions);
  const modelData: ModelData[] = [];
  //Testing purpose splice
  makeElements.splice(35);

  const cookieButton = await page.waitForSelector(modelClasses.cookieReject);
  await cookieButton?.click();

  //Page has animation delay of 400 ms
  await page.waitForTimeout(500);
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
              const suboptionsExist = elements.some((e) => {
                return e.classList.contains("sub-option");
              });

              const modelEvaluatorProps: ModelEvaluatorProps = {
                models: elements,
                suboptionsExist,
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
