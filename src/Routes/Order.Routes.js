// src/Routes/Order.Routes.js
import express from "express";
import {
  AddOrder,
  GetUserOrders,
  GetOrderById,
  GetAllOrders,
  ModifyOrder,
  RemoveOrder,
} from "../Controllers/Order.Controller.js";
import { isLoggedin, isAdmin } from "../Middlewares/AuthMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.route("/create").post(isLoggedin, AddOrder);
orderRoutes.route("/user").get(isLoggedin, GetUserOrders);
orderRoutes.route("/get/:id").get(isLoggedin, GetOrderById);

// Admin Routes
orderRoutes.route("/all").get(isLoggedin, isAdmin, GetAllOrders);
orderRoutes.route("/update/:id").put(isLoggedin, isAdmin, ModifyOrder);
orderRoutes.route("/delete/:id").delete(isLoggedin, isAdmin, RemoveOrder);

export { orderRoutes };
