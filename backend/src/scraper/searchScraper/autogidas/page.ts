import { SearchPageProps } from "../types";
import { urlConstructor } from "./functions/urlConstructor";
export const autogidasScraper = async ({
  browser,
  params,
}: SearchPageProps) => {
  const page = await browser.newPage();
  await page.goto(urlConstructor(params));

  // await page.close();
};
