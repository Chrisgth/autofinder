import { DataScraperProps, DataSite, MakeData } from "../types";
import autogidasClassStrings from "./utils/classStrings";
import { MakeTemplateType, makeTemplate } from "./utils/templates";

export const getMakes = async ({ page }: DataScraperProps) => {
  // Datasite is seperated and passed as an argument because puppeteer runs into issues if done internally
  const dataSite = DataSite.AUTOGIDAS;
  const { makeClasses } = autogidasClassStrings;
  const makeTemplateStr = `${makeTemplate}`;

  const makes: MakeData[] = await page.$$eval(
    makeClasses.dropdownOptions,
    (elements, dataSite, makeTemplate) =>
      elements.reduce<Array<MakeData>>((data, e) => {
        const countString = e.querySelector(
          ".value-records-count"
        )?.textContent;
        const count = countString ? parseInt(countString) : 0;

        if (count) {
          const func = eval(makeTemplate) as MakeTemplateType;
          data.push(func({ e, dataSite, count }));
        }
        return data;
      }, []),
    dataSite,
    makeTemplateStr
  );
  return makes;
};
