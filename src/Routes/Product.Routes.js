import express from "express";
import { RegisterProduct } from "../Controllers/Product.Controller.js";
import { isLoggedin, isAdmin } from "../Middlewares/AuthMiddleware.js";

const productRoutes = express.Router();

productRoutes
  .route("/createproduct")
  .post(isLoggedin, isAdmin, RegisterProduct);

export { productRoutes };
