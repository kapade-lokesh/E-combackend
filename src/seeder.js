import dotenv from "dotenv";
import { Product } from "./models/Product.Model.js";
import { User } from "./Models/User.Model.js";
import { products } from "./data/products.js";
import { connectDb } from "./Config/connectDB.js";
import { Cart } from "./Models/Cart.Model.js";

dotenv.config({ path: "../env" });

(async () => {
  try {
    connectDb();
  } catch (error) {
    console.log(error);
  }
})();

const seedData = async () => {
  try {
    // crearing existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //creating admin user
    const createdUser = await User.create({
      name: "admin user",
      email: "admin@example.com",
      password: "password",
      role: "admin",
    });

    const userId = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    await Product.insertMany(sampleProducts);
    console.log("Products data inserted successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();
