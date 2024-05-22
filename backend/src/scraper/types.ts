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

export interface ModelTemplateProps extends TemplateProps {
  makeDataValue: string;
}

export type MakeData = {
  value: string | null;
  dataValue: string | null;
  count: number | null;
  dataSite?: DataSite;
  commonValue?: string | null;
};

export type ModelData = {
  makeDataValue: string | null;
  value: string | null;
  dataValue: string | null;
  count: number | null;
  dataSite?: DataSite;
  commonValue?: string | null;
};

export type RawSiteData = {
  makes: MakeData[];
  models: ModelData[];
};

export type RawScraperData = {
  autogidasData: RawSiteData;
  autopliusData: RawSiteData;
};
