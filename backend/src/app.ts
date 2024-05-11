import express, { NextFunction, Request, Response } from "express";
import searchesRouter from "./routes/search";
import scraperRouter from "./routes/scraper";
import dataRouter from "./routes/data";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(express.json());

app.use("/api/searches", searchesRouter);

app.use("/api/scraper", scraperRouter);

app.use("/api/data", dataRouter);

// app.get("/test", async (req, res, next) => {
//   try {
//     const data = await dataScrape();
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// });

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

export default app;
