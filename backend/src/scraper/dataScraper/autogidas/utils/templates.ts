// const makes: MakeData[] = await page.$$eval(
//   makeClasses.dropdownOptions,
//   (es, dataSite) =>
//     es.reduce<Array<MakeData>>((data, e) => {
//       if (e.getAttribute("data-badge") !== "0") {
//         data.push({
//           value: e.getAttribute("data-title"),
//           dataValue: e.getAttribute("data-value"),
//           count: e.getAttribute("data-badge"),
//           dataSite: dataSite,
//         });
//       }
//       return data;
//     }, []),
//   dataSite

import {
  MakeData,
  ModelData,
  ModelTemplateProps,
  TemplateProps,
} from "../../../types";

export interface AutogidasMakeTemplateProps extends TemplateProps {
  count: number;
}

export const modelTemplate = ({
  e,
  dataSite,
  makeDataValue,
}: ModelTemplateProps): ModelData => {
  return {
    makeDataValue,
    value: e.getAttribute("data-title"),
    dataValue: e.getAttribute("data-value"),
    count: parseInt(
      e.querySelector(".value-records-count")?.textContent || "0"
    ),
    dataSite: dataSite,
  };
};

export const makeTemplate = ({
  e,
  dataSite,
  count,
}: AutogidasMakeTemplateProps): MakeData => {
  return {
    value: e.getAttribute("data-title"),
    dataValue: e.getAttribute("data-value"),
    count,
    dataSite: dataSite,
  };
};

export type ModelTemplateType = typeof modelTemplate;
export type MakeTemplateType = typeof makeTemplate;
