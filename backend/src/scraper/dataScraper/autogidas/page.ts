import { PageProps, RawSiteData } from "../types";
import { getMakes } from "./makes";
import { getModels } from "./models";

export const autogidasScraper = async ({
  browser,
}: PageProps): Promise<RawSiteData> => {
  const page = await browser.newPage();
  await page.goto("https://autogidas.lt/en/");

  const makes = await getMakes({ page });
  const models = await getModels({ page });

  await page.close();
  return { makes, models };
};
