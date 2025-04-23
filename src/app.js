import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./Config/connectDB.js";
import { userRouter } from "./Routes/User.Routes.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());

(async () => {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
  }
})();

app.use("/users", userRouter);

export { app };
