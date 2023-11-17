import { PageProps } from "../../types";
import { getMakes } from "./makes";

export const autopliusScraper = async ({ browser }: PageProps) => {
  const page = await browser.newPage();
  await page.goto("https://en.autoplius.lt/");

  const makes = await getMakes({ page });

  await page.close();
  return makes;
};
