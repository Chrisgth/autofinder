import { DataScraperProps, MakeData } from "../types";

export const getMakes = async ({ page }: DataScraperProps) => {
  const makes: MakeData[] = await page.$$eval(
    ".input-select.js-make .dropdown-options.js-options .dropdown-option",
    (elements) =>
      elements.reduce<Array<MakeData>>((data, e) => {
        if (e.getAttribute("data-badge") !== "0") {
          data.push({
            value: e.getAttribute("data-title"),
            dataValue: e.getAttribute("data-value"),
          });
        }
        return data;
      }, [])
  );
  return makes;
};
