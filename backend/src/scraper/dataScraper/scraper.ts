import puppeteer from "puppeteer";
import { autopliusScraper } from "./autoplius/page";
import { autogidasScraper } from "./autogidas/page";
import { RawScraperData } from "./types";

export const dataScrape = async (): Promise<RawScraperData | undefined> => {
  try {
    const browser1 = await puppeteer.launch();
    const browser2 = await puppeteer.launch();

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
