import express from "express";
import { AddCart, UpdateCart } from "../Controllers/Cart.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";

const cartRoutes = express.Router();

cartRoutes.route("/create").post(AddCart);
cartRoutes.route("/updatecart").put(isLoggedin, UpdateCart);

export { cartRoutes };
