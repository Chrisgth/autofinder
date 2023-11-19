import { DataScraperProps, DataSite, MakeData } from "../../types";
import autopliusClassStrings from "./utils/classStrings";
import { makeTemplate } from "./utils/templates";

export const getMakes = async ({ page }: DataScraperProps) => {
  // Datasite is seperated and passed as an argument because puppeteer runs into issues if done internally
  const dataSite = DataSite.AUTOPLIUS;
  const { makeClasses } = autopliusClassStrings;

  const makes: MakeData[] = await page.$$eval(
    makeClasses.dropdownOptions,
    (elements, dataSite) =>
      elements.reduce<Array<MakeData>>((data, e) => {
        if (e.getAttribute("data-badge") !== "0") {
          data.push(makeTemplate({ e, dataSite }));
        }
        return data;
      }, []),
    dataSite
  );
  return makes;
};
