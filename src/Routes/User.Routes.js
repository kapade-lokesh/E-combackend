import express from "express";
import {
  GetUserProfile,
  LoginUser,
  RegisterUser,
} from "../Controllers/User.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(RegisterUser);
userRoutes.route("/login").post(LoginUser);
userRoutes.route("/profile").get(isLoggedin, GetUserProfile);

export { userRoutes };
