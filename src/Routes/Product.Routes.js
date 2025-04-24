import express from "express";
import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from "../Controllers/Product.Controller.js";
import { isLoggedin, isAdmin } from "../Middlewares/AuthMiddleware.js";

const productRoutes = express.Router();

productRoutes.route("/createproduct").post(isLoggedin, isAdmin, AddProduct);

productRoutes.route("/update/:id").put(isLoggedin, isAdmin, UpdateProduct);

productRoutes.route("/delete/:id").delete(isLoggedin, isAdmin, DeleteProduct);

export { productRoutes };
