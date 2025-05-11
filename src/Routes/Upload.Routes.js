import express from "express";
import { UploadImage } from "../Controllers/Upload.Controller.js";
import { isLoggedin } from "../Middlewares/AuthMiddleware.js";
import { upload } from "../Middlewares/MulterMiddleware.js";

const uploadRoutes = express.Router();

uploadRoutes
  .route("/image")
  .post(isLoggedin, upload.single("image"), UploadImage);

export { uploadRoutes };
