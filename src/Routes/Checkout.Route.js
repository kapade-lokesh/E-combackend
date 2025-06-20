// src/Routes/Checkout.Routes.js
import express from "express";
import {
  AddCheckout,
  UpdateCheckout,
  FinalizeCheckout,
} from "../Controllers/Checkout.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";

const checkoutRoutes = express.Router();

checkoutRoutes.route("/create").post(isLoggedin, AddCheckout);
checkoutRoutes.route("/update/:id").put(isLoggedin, UpdateCheckout);
checkoutRoutes.route("/finalize/:id").post(isLoggedin, FinalizeCheckout);

export { checkoutRoutes };
