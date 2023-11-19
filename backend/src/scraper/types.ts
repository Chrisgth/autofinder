import { Browser, Page } from "puppeteer";

export enum DataSite {
  AUTOGIDAS,
  AUTOPLIUS,
}

export interface PageProps {
  browser: Browser;
}

export interface DataScraperProps {
  page: Page;
}

export interface ClassStringProps {}

export interface TemplateProps {
  e: Element;
  dataSite: DataSite;
}

export type MakeData = {
  value: string | null;
  dataValue: string | null;
  count: string | null;
  dataSite?: DataSite;
};

export type ModelData = {
  makeDataValue: string | null;
  value: string | null;
  dataValue: string | null;
  count: string | null;
  dataSite?: DataSite;
};
