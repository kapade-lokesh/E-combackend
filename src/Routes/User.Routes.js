import express from "express";
import {
  GetUserProfile,
  LoginUser,
  RegisterUser,
} from "../Controllers/User.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(RegisterUser);
userRouter.route("/login").post(LoginUser);
userRouter.route("/profile").get(isLoggedin, GetUserProfile);

export { userRouter };
