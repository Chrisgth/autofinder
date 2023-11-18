import puppeteer from "puppeteer";
import { autopliusScraper } from "./autoplius/page";

export const dataScrape = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });

    const autopliusMakes = await autopliusScraper({ browser });
    console.log(autopliusMakes);
    // browser.close();
  } catch (error) {
    console.error("Error during datascraping:", error);
  }
};
