import { Product } from "../models/Product.Model.js";

const addNewProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

const findProductById = async (id) => {
  return await Product.findById(id);
};

const updateProductById = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProductById = async (id) => {
  return await Product.findByIdAndDelete(id, { new: true });
};
export { addNewProduct, findProductById, updateProductById,deleteProductById };
