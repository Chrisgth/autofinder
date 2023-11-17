import { Browser, Page } from "puppeteer";

export interface PageProps {
  browser: Browser;
}

export interface DataScraperProps {
  page: Page;
}

export type MakeData = {
  value: string | null;
  dataValue: string | null;
};
