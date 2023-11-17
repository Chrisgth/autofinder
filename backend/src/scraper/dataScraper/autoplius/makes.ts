import { DataScraperProps, DataSite, MakeData } from "../../types";
import { getMakeClasses } from "../../utils/classStrings";

export const getMakes = async ({ page }: DataScraperProps) => {
  // Datasite is seperated and passed as an argument because puppeteer runs into issues if done internally
  const dataSite = DataSite.AUTOPLIUS;
  const makes: MakeData[] = await page.$$eval(
    getMakeClasses({ dataSite }),
    (elements, dataSite) =>
      elements.reduce<Array<MakeData>>((data, e) => {
        if (e.getAttribute("data-badge") !== "0") {
          data.push({
            value: e.getAttribute("data-title"),
            dataValue: e.getAttribute("data-value"),
            count: e.getAttribute("data-badge"),
            dataSite: dataSite,
          });
        }
        return data;
      }, []),
    dataSite
  );
  return makes;
};
