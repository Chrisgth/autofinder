import { DataScraperProps, ModelData } from "../../types";
import { getAutopliusClasses } from "../../utils/classStrings";

export const getModels = async ({ page }: DataScraperProps) => {
  // Datasite is seperated and passed as an argument because puppeteer runs into issues if done internally
  const { modelClasses, makeClasses } = getAutopliusClasses();
  const makeElements = await page.$$(makeClasses.dropdownOptions);
  const modelData: any[] = [];

  const cookieButton = await page.waitForSelector(modelClasses.cookieReject);
  await cookieButton?.click();

  //Page has animation delay of 400 ms
  await page.waitForTimeout(500);
  const dropdown = await page.waitForSelector(modelClasses.makeDropdown);

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

        const overlay = await page.waitForSelector(modelClasses.overlay, {
          visible: true,
          timeout: 5000,
        });

        await overlay?.click();

        const models = await page.$$eval(
          modelClasses.dropdownOptions,
          (elements) =>
            elements.map((e) => ({ test: e.getAttribute("data-title") }))
        );
        await modelData.push(models);

        const clear = await page.waitForSelector(modelClasses.clearButton);

        await clear?.click();
      }
    }
  } catch (error) {
    console.error("Error in model fetching loop:", error);
  }

  return modelData;
};
