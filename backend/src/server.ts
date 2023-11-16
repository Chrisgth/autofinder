import "dotenv/config";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import app from "./app";

const port = env.PORT;

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
