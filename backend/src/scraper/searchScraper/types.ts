import { Make } from "../../models/make";
import { Model } from "../../models/model";
import { PageProps } from "../dataScraper/types";

export type SiteSearchParams = {
  makeParam: Make | undefined;
  modelParam: Model | undefined;
};

export type SearchScraperParams = {
  autogidasParams: SiteSearchParams;
  autopliusParams: SiteSearchParams;
};
export interface SearchPageProps extends PageProps {
  params: SiteSearchParams;
}
