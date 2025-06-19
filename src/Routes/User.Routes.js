// src/Routes/User.Routes.js
import express from "express";
import {
  GetAllUsers,
  GetUserProfile,
  LoginUser,
  ModifyUser,
  RegisterUser,
  RemoveUser,
} from "../Controllers/User.Controller.js";
import { isLoggedin, isAdmin } from "../Middlewares/AuthMiddleware.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(RegisterUser);
userRoutes.route("/login").post(LoginUser);
userRoutes.route("/profile").get(isLoggedin, GetUserProfile);

// Admin Routes
userRoutes.route("/admin/getallusers").get(isLoggedin, isAdmin, GetAllUsers);
userRoutes.route("/admin/adduser").post(isLoggedin, isAdmin, RegisterUser);
userRoutes.route("/admin/updateuser/:id").put(isLoggedin, isAdmin, ModifyUser);
userRoutes
  .route("/admin/deleteuser/:id")
  .delete(isLoggedin, isAdmin, RemoveUser);

export { userRoutes };
