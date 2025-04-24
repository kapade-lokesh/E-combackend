import {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Services/Product.Service.js";

// Add a Product (Admin only, protected route)
const AddProduct = async (req, res) => {
  try {
    const result = await addProduct(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding product:", error.message);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

// Get a Product by ID (Public route)
const GetProductById = async (req, res) => {
  try {
    const result = await getProductById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving product:", error.message);
    res.status(error.message === "Product not found" ? 404 : 500).json({
      message: "Error retrieving product",
      error: error.message,
    });
  }
};

// Update a Product (Admin only, protected route)
const UpdateProduct = async (req, res) => {
  try {
    const result = await updateProduct(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(error.message === "Product not found" ? 404 : 500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error while deleting product", error.message);
    res.status(error.message === "product not found" ? 404 : 500).json({
      message: "Error while deleting the product",
      error: error.message,
    });
  }
};

export { AddProduct, GetProductById, UpdateProduct, DeleteProduct };
