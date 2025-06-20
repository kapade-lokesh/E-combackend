// src/Routes/Cart.Routes.js
import express from "express";
import {
  AddCart,
  DeleteCart,
  GetCart,
  MergeCart,
  UpdateCart,
} from "../Controllers/Cart.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";

const cartRoutes = express.Router();

cartRoutes.route("/create").post(AddCart);
cartRoutes.route("/get").get(GetCart);
cartRoutes.route("/update").put(UpdateCart);
cartRoutes.route("/merge").post(isLoggedin, MergeCart);
cartRoutes.route("/delete").delete(DeleteCart);

export { cartRoutes };
