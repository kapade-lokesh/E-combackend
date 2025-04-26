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

const findProductByCustomfilter = async (filter, limit, sort) => {
  const products = await Product.find(filter)
    .sort(sort)
    .limit(Number(limit ? limit : 10));

  return products;
};

const findBestSeller = async () => {
  const product = await Product.findOne().sort({ rating: -1 });
  return product;
};

const findNewArrivals = async () => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(8);
  return products;
};
export {
  addNewProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  findProductByCustomfilter,
  findBestSeller,
  findNewArrivals,
};
