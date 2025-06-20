// src/Repository/Product.Repo.js
import { Product } from "../Models/Product.Model.js";
import ApiError from "../Utils/ApiError.js";

const addNewProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, "DUPLICATE_SKU", "SKU already exists");
    }
    throw new ApiError(500, "CREATE_FAILED", error.message);
  }
};

const findProductById = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid product ID");
  const product = await Product.findById(id);
  if (!product)
    throw new ApiError(404, "PRODUCT_NOT_FOUND", "Product not found");
  return product;
};

const updateProductById = async (id, updateData) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid product ID");
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!product)
    throw new ApiError(404, "PRODUCT_NOT_FOUND", "Product not found");
  return product;
};

const deleteProductById = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid product ID");
  const product = await Product.findByIdAndDelete(id);
  if (!product)
    throw new ApiError(404, "PRODUCT_NOT_FOUND", "Product not found");
  return product;
};

const findProductByCustomfilter = async (filter, limit, sort) => {
  return await Product.find(filter)
    .sort(sort)
    .limit(Number(limit || 10));
};

const findBestSeller = async () => {
  const product = await Product.findOne().sort({ rating: -1 });
  if (!product)
    throw new ApiError(404, "PRODUCT_NOT_FOUND", "No best seller found");
  return product;
};

const findNewArrivals = async () => {
  return await Product.find().sort({ createdAt: -1 }).limit(8);
};

const findAllProducts = async () => {
  return await Product.find();
};

export {
  addNewProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  findProductByCustomfilter,
  findBestSeller,
  findNewArrivals,
  findAllProducts,
};
