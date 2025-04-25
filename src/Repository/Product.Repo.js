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

const findProductByCustomfilter = async (filter, sort, limit) => {
  const products = await Product.find(filter)
    .sort(sort)
    .limit(Number(limit || 10));
  console.log(filter);
  console.log(products);
  return products;
};
export {
  addNewProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  findProductByCustomfilter,
};
