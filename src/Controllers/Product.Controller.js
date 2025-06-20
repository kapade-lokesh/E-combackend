// src/Controllers/Product.Controller.js
import {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
  getSimilarProducts,
  getBestSeller,
  getNewArrivals,
  getAllProducts,
} from "../Services/Product.Service.js";

const AddProduct = async (req, res) => {
  const result = await addProduct(req.body, req.user);
  res.status(201).json(result);
};

const GetProductById = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);
  res.status(200).json(result);
};

const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const result = await updateProduct(id, req.body);
  res.status(200).json(result);
};

const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await deleteProduct(id);
  res.status(200).json(result);
};

const GetFilteredProducts = async (req, res) => {
  const result = await getFilteredProducts(req.query);
  res.status(200).json(result);
};

const GetSimilarProducts = async (req, res) => {
  const result = await getSimilarProducts(req.params, req.query);
  res.status(200).json(result);
};

const GetBestSeller = async (req, res) => {
  const result = await getBestSeller();
  res.status(200).json(result);
};

const GetNewArrivals = async (req, res) => {
  const result = await getNewArrivals();
  res.status(200).json(result);
};

const GetAllProducts = async (req, res) => {
  const result = await getAllProducts();
  res.status(200).json(result);
};

export {
  AddProduct,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
  GetFilteredProducts,
  GetSimilarProducts,
  GetBestSeller,
  GetNewArrivals,
  GetAllProducts,
};
