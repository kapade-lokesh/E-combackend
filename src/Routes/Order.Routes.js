import express from "express";
import {
  GetAllOrders,
  GetOrderByID,
  GetUserOrders,
  ModifyOrder,
  RemoveOrder,
} from "../Controllers/Orders.Controller.js";
import { isLoggedin, isAdmin } from "../Middlewares/AuthMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.route("/getall-orders").get(isLoggedin, GetUserOrders);
orderRoutes.route("/getorder/:id").get(isLoggedin, GetOrderByID);

// * admin Routes
orderRoutes.route("/getallorders").get(isLoggedin, isAdmin, GetAllOrders);
orderRoutes.route("/updateorder/:id").put(isLoggedin, isAdmin, ModifyOrder);
orderRoutes.route("/deleteorder/:id").delete(isLoggedin, isAdmin, RemoveOrder);
export { orderRoutes };
