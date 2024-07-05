import { SearchPageProps } from "../types";
import { urlConstructor } from "./functions/urlConstructor";
import { getResults } from "./results";
export const autogidasScraper = async ({
  browser,
  params,
}: SearchPageProps) => {
  const page = await browser.newPage();
  await page.goto(urlConstructor(params));
  const results = await getResults({ page });

  // await page.close();
};
