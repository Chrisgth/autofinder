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

import { MakeData, ModelData, TemplateProps } from "../../../types";

// );

interface ModelTemplateProps extends TemplateProps {
  makeDataValue: string;
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
    count: e.getAttribute("data-badge"),
    dataSite: dataSite,
  };
};

export const makeTemplate = ({ e, dataSite }: TemplateProps): MakeData => {
  return {
    value: e.getAttribute("data-title"),
    dataValue: e.getAttribute("data-value"),
    count: e.getAttribute("data-badge"),
    dataSite: dataSite,
  };
};
