// src/Routes/Product.Routes.js
import express from "express";
import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  GetProductById,
  GetFilteredProducts,
  GetSimilarProducts,
  GetBestSeller,
  GetNewArrivals,
  GetAllProducts,
} from "../Controllers/Product.Controller.js";
import { isLoggedin, isAdmin } from "../Middlewares/AuthMiddleware.js";

const productRoutes = express.Router();

productRoutes.route("/create").post(isLoggedin, isAdmin, AddProduct);
productRoutes.route("/update/:id").put(isLoggedin, isAdmin, UpdateProduct);
productRoutes.route("/delete/:id").delete(isLoggedin, isAdmin, DeleteProduct);
productRoutes.route("/filter").get(GetFilteredProducts);
productRoutes.route("/similar/:id").get(GetSimilarProducts);
productRoutes.route("/get/:id").get(GetProductById);
productRoutes.route("/bestseller").get(GetBestSeller);
productRoutes.route("/newarrivals").get(GetNewArrivals);
productRoutes.route("/all").get(isLoggedin, isAdmin, GetAllProducts);

export { productRoutes };
