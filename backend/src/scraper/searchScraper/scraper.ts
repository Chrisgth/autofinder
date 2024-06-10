import puppeteer from "puppeteer";
import { autogidasScraper } from "./autogidas/page";
import { autopliusScraper } from "./autoplius/page";

export const dataScrape = async () => {
  try {
    const browser1 = await puppeteer.launch({ headless: false });
    const browser2 = await puppeteer.launch({ headless: false });

    const [autogidasData, autopliusData] = await Promise.all([
      autogidasScraper({ browser: browser1 }),
      autopliusScraper({ browser: browser2 }),
    ]);

    return { autogidasData, autopliusData };
    // browser.close();
  } catch (error) {
    console.error("Error during datascraping:", error);
  }
};
