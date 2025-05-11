import express from "express";
import {
  CreateSubscriber,
  GetSubcribedUser,
} from "../Controllers/Subscribe.Controller.js";

const subcribeRoutes = express.Router();

subcribeRoutes.route("/create").post(CreateSubscriber);
subcribeRoutes.route("/getsubscriber").post(GetSubcribedUser);

export {subcribeRoutes}