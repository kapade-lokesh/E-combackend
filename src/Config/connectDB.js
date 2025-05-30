import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log("database Connected", connectionInstance.connection.host);
  } catch (error) {
    console.log("connection fial", error);
    process.exit(1);
  }
};

export { connectDb };
