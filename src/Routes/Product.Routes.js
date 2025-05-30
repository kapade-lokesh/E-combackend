import express from "express";
import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  GetProductById,
  GetFilteredProducts,
  GetSimilerProducts,
  GetBestSeller,
  GetNewArrivals,
  GetAllProducts,
} from "../Controllers/Product.Controller.js";
import { isLoggedin, isAdmin } from "../Middlewares/AuthMiddleware.js";

const productRoutes = express.Router();

productRoutes.route("/createproduct").post(isLoggedin, isAdmin, AddProduct);

productRoutes.route("/update/:id").put(isLoggedin, isAdmin, UpdateProduct);

productRoutes.route("/delete/:id").delete(isLoggedin, isAdmin, DeleteProduct);

productRoutes.route("/getfilterproducts/").get(GetFilteredProducts);

productRoutes.route("/getsimilerproducts/:id").get(GetSimilerProducts);

productRoutes.route("/getproduct/:id").get(GetProductById);

productRoutes.route("/getbestseller").get(GetBestSeller);

productRoutes.route("/getnewarrivals").get(GetNewArrivals);

productRoutes.route("/getallproducts").get(isLoggedin, isAdmin, GetAllProducts);
export { productRoutes };
