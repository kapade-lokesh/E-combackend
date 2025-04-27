import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./Config/connectDB.js";
import { userRoutes } from "./Routes/User.Routes.js";
import { productRoutes } from "./Routes/Product.Routes.js";
import { cartRoutes } from "./Routes/Cart.Routes.js";
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

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

export { app };
