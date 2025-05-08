import express from "express";
import {
  AddCheckout,
  FinalizeCheckout,
  UpdateCheckout,
} from "../Controllers/Checkout.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";

const chekcoutRoutes = express.Router();

chekcoutRoutes.route("/create").post(isLoggedin, AddCheckout);
chekcoutRoutes.route("/update/:id").put(isLoggedin, UpdateCheckout);
chekcoutRoutes.route("/finalize/:id").post(isLoggedin, FinalizeCheckout);

export { chekcoutRoutes };
