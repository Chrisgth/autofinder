import { PageProps } from "../../dataScraper/types";
export const autopliusScraper = async ({ browser }: PageProps) => {
  const page = await browser.newPage();
  await page.goto("https://en.autoplius.lt/");

  // await page.close();
};
