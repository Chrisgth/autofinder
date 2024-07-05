import { ElementHandle } from "puppeteer";
import { DataScraperProps } from "../../dataScraper/types";
import { autogidasClassStrings } from "./utils/classStrings";
import { acceptAutogidasCookie } from "../../dataScraper/autogidas/functions/acceptCookie";
export const getResults = async ({ page }: DataScraperProps) => {
  const results: ElementHandle[] = [];
  let paginatorNextBtn = await page.$(autogidasClassStrings.paginatorNextBtn);

  await acceptAutogidasCookie(page);

  try {
    while (paginatorNextBtn) {
      const items = await page.$$(autogidasClassStrings.allItems);
      results.concat(items);

      await Promise.all([
        paginatorNextBtn.scrollIntoView(),
        paginatorNextBtn.click(),
        page.waitForNavigation(),
      ]);

      paginatorNextBtn = await page.$(autogidasClassStrings.paginatorNextBtn);
    }
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};
