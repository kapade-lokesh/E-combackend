import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./Config/connectDB.js";
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

export { app };
