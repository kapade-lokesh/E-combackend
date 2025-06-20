// src/Routes/Subscribe.Routes.js
import express from "express";
import {
  CreateSubscriber,
  GetSubscribedUser,
} from "../Controllers/Subscribe.Controller.js";

const subscribeRoutes = express.Router();

subscribeRoutes.route("/create").post(CreateSubscriber);
subscribeRoutes.route("/get").post(GetSubscribedUser);

export { subscribeRoutes };
