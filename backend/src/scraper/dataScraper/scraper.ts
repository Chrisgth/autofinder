import puppeteer from "puppeteer";
// import { autopliusScraper } from "./autoplius/page";
import { autogidasScraper } from "./autogidas/page";

export const dataScrape = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });

    const autogidasData = await autogidasScraper({ browser });

    // const autopliusData = await autopliusScraper({ browser });

    return autogidasData;
    // browser.close();
  } catch (error) {
    console.error("Error during datascraping:", error);
  }
};
