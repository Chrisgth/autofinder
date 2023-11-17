import { ClassStringProps, DataSite } from "../types";

export const getMakeClasses = ({ dataSite }: ClassStringProps) => {
  return dataSite === DataSite.AUTOGIDAS
    ? ""
    : ".input-select.js-make .dropdown-options.js-options .dropdown-option";
};
