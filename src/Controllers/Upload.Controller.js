import { uploadToCloudinary } from "../Services/Coludinary.Service.js";

const UploadImage = async (req, res) => {
  const file = req.file;
  console.log("hitting controller");
  try {
    if (!file) {
      return { message: "provide the file please" };
    }

    const result = await uploadToCloudinary(file.buffer);

    return res
      .status(200)
      .json({ message: "Image uploaded", imageUrl: result.secure_url });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Image upload fail", error: error.message });
  }
};

export { UploadImage };
