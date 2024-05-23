import { MakeData } from "../scraper/types";

const commonStrings = ["kita", "other"];
export const findCommonMakes = (makes: MakeData[]) => {
  makes.forEach((e, i) => {
    if (
      commonStrings.some((string) => e.value?.toLowerCase().includes(string))
    ) {
      console.log("some");
      const commonMake = makes.find((el, index) => {
        if (
          index !== i &&
          commonStrings.some((string) =>
            el.value?.toLowerCase().includes(string)
          )
        ) {
          makes[index].commonValue = e.value;
          return el;
        }
      });
      if (commonMake) {
        console.log(e, commonMake);
        makes[i].commonValue = commonMake.value;
      }
    }
    return;
  });
};
