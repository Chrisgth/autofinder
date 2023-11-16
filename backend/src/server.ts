import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import env from "./utils/validateEnv";

const app = express();
const port = env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(env.DB_URI)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`server started, listening on port ${port}`);
    });
  })
  .catch(() => {
    console.error;
  });
