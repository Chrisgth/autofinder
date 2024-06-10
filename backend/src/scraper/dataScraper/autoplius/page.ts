import { PageProps, RawSiteData } from "../types";
import { getMakes } from "./makes";
import { getModels } from "./models";

export const autopliusScraper = async ({
  browser,
}: PageProps): Promise<RawSiteData> => {
  const page = await browser.newPage();
  await page.goto("https://en.autoplius.lt/");

  const makes = await getMakes({ page });
  const models = await getModels({ page });

  await page.close();
  return { makes, models };
};
