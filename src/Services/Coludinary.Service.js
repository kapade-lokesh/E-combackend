// services/cloudinaryService.js
import { cloudinary } from "../Config/Coludinaryconfig.js";
import streamifier from "streamifier";

const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    console.log("hitting service");
    // Create Cloudinary upload stream
    const stream = cloudinary.uploader.upload_stream(
      { ...options }, // Options can include folder, transformations, etc.
      (error, result) => {
        console.log(result);
        if (error) return reject(new Error(error.message));
        resolve(result);
      }
    );

    // Convert Buffer to Readable Stream and pipe to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export { uploadToCloudinary };
