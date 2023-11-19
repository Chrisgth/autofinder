import { Page } from "puppeteer";
import autopliusClassStrings from "../utils/classStrings";

const { modelClasses } = autopliusClassStrings;

export const declineAutopliusCookie = async (page: Page) => {
  const cookieButton = await page.waitForSelector(modelClasses.cookieReject);
  await cookieButton?.click();

  //Page has animation delay of 400 ms after cookies are denied
  await page.waitForTimeout(500);
};
