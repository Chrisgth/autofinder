import { PageProps } from "../../types";
// import { getMakes } from "./makes";
import { getModels } from "./models";
// import { getModels } from "./models";

export const autogidasScraper = async ({ browser }: PageProps) => {
  const page = await browser.newPage();
  await page.goto("https://autogidas.lt/en/");

  // const makes = await getMakes({ page });
  const models = await getModels({ page });

  // await page.close();
  return models;
};
