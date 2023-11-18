import { DataScraperProps, DataSite, ModelData } from "../../types";
import { getMakeClasses } from "../../utils/classStrings";

export const getModels = async ({ page }: DataScraperProps) => {
  // Datasite is seperated and passed as an argument because puppeteer runs into issues if done internally
  const dataSite = DataSite.AUTOPLIUS;
  const makeElements = await page.$$(getMakeClasses({ dataSite }));
  const modelData: any[] = [];

  const cookieButton = await page.waitForSelector(
    "#onetrust-reject-all-handler"
  );
  await cookieButton?.click();

  await page.waitForTimeout(1000);
  const dropdown = await page.waitForSelector(
    ".input-select.js-make .display-input.js-placeholder"
  );

  try {
    for (const element of makeElements) {
      const dataBadge = await element.evaluate((el) => {
        return el.getAttribute("data-badge");
      });

      if (dataBadge !== "0") {
        console.log(dataBadge);
        await dropdown?.click();

        await element.scrollIntoView();
        await element.click();

        await page.waitForTimeout(1000);

        const overlay = await page.waitForSelector(
          ".input-select.js-model .input-overlay"
        );

        await overlay?.click();

        const models = await page.$$eval(
          ".input-select.js-model .dropdown-options.js-options .dropdown-option",
          (elements) =>
            elements.map((e) => ({ test: e.getAttribute("data-title") }))
        );
        await modelData.push(models);

        const clear = await page.waitForSelector(
          ".input-select.js-make .clear-btn"
        );

        await clear?.click();
      }
    }
  } catch (error) {
    console.error("Error fetching models:", error);
  }

  return modelData;
};
