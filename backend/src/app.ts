import express, { NextFunction, Request, Response } from "express";
import searchesRouter from "./routes/search";

const app = express();

app.use("/api/searches", searchesRouter);

app.use((req, res, next) => {
  next(Error("Page not found"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
