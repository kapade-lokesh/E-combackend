import express from "express";
import {
  GetOrderByID,
  GetUserOrders,
} from "../Controllers/Orders.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.route("/getall-orders").get(isLoggedin, GetUserOrders);
orderRoutes.route("/getorder/:id").get(isLoggedin, GetOrderByID);

export { orderRoutes };
