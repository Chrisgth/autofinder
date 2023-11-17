import express, { NextFunction, Request, Response } from "express";
import searchesRouter from "./routes/search";
import createHttpError, { isHttpError } from "http-errors";
import { dataScrape } from "./scraper/dataScraper/scraper";

const app = express();

app.use(express.json());

app.use("/api/searches", searchesRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Page not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let errorStatus = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    errorStatus = error.status;
  }
  res.status(errorStatus).json({ error: errorMessage });
});

dataScrape();

export default app;
