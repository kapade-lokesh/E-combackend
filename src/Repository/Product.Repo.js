import { Product } from "../Models/Product.Model.js";

const createProduct = async (parameters) => {
  const product = new Product(parameters);
  return await product.save();
};

const findProductById = async (id) => {
  return await Product.findById(id);
};

export { createProduct, findProductById };
