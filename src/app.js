import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./Config/connectDB.js";
import { userRoutes } from "./Routes/User.Routes.js";
import { productRoutes } from "./Routes/Product.Routes.js";
import { cartRoutes } from "./Routes/Cart.Routes.js";
import { chekcoutRoutes } from "./Routes/Checkout.Route.js";
import { orderRoutes } from "./Routes/Order.Routes.js";
import { uploadRoutes } from "./Routes/Upload.Routes.js";
import { subcribeRoutes } from "./Routes/Subcribe.Routes.js";
import errorHandler from "./Middlewares/ErrorMiddleware.js";
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
app.use("/checkout", chekcoutRoutes);
app.use("/orders", orderRoutes);
app.use("/upload", uploadRoutes);
app.use("/subscrib", subcribeRoutes);

//globle error handler
app.use(errorHandler);

export { app };
