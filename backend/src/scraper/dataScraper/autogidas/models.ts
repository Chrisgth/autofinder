import { DataScraperProps, ModelData } from "../../types";
import { acceptAutogidasCookie } from "./functions/acceptCookie";
import autogidasClassStrings from "./utils/classStrings";

export const getModels = async ({ page }: DataScraperProps) => {
  const { modelClasses, makeClasses } = autogidasClassStrings;
  const makeElements = await page.$$(makeClasses.dropdownOptions);
  const modelData: ModelData[] = [];
  await acceptAutogidasCookie(page);

  const overlay = await page.waitForSelector(modelClasses.overlay, {
    visible: false,
    timeout: 5000,
  });
  await overlay?.evaluate((el) => {
    el.remove();
  });
  console.log("overlayremoved");

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

        const models = await page.$$eval(modelClasses.dropdownOptions, (el) => {
          const map = el.map((e) => {
            return {
              // valueRecordsCount: e.querySelector(modelClasses.valueRecordsCount)
              //   ?.textContent,
              dataValue: e.getAttribute("data-value"),
            };
          });
          return map;
        });

        console.log(models);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
