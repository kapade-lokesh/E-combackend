import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("server is started..");
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
