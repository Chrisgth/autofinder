import { SiteSearchParams } from "../../types";
import { urlParams } from "../utils/urlParams";
export const urlConstructor = (params: SiteSearchParams) => {
  const makeString = urlParams.makeParam + (params.makeParam?.dataValue ?? "");
  const modelString =
    urlParams.modelParam + (params.modelParam?.dataValue ?? "");
  const url = urlParams.baseUrl + makeString + modelString;

  return url;
};
