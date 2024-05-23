import { MakeData, ModelData } from "../scraper/types";

const commonStrings = ["kita", "other"];
export const findCommonValues = (objects: MakeData[] | ModelData[]) => {
  objects.forEach((e, i) => {
    if (
      commonStrings.some((string) => e.value?.toLowerCase().includes(string))
    ) {
      e.value = "Other";
    }
  });
};
