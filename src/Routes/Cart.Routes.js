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
cartRoutes.route("/getcart").get(GetCart);
cartRoutes.route("/updatecart").put(UpdateCart);
cartRoutes.route("/mergecart").post(isLoggedin, MergeCart);
cartRoutes.route("/deletecart").delete(DeleteCart);

export { cartRoutes };
