import {
  addNewProduct,
  deleteProductById,
  findProductById,
  updateProductById,
} from "../Repository/Product.Repo.js";

const addProduct = async (productData, userData) => {
  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimenstions,
    weight,
    sku,
  } = productData;

  // Validate required fields (example)
  if (!name || !price || !countInStock) {
    throw new Error("Name, price, and countInStock are required");
  }

  const product = await addNewProduct({
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimenstions,
    weight,
    sku,
    user: userData._id,
  });

  return { message: "Product added successfully", product };
};

const getProductById = async (id) => {
  const product = await findProductById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return { message: "Product found", product };
};

const updateProduct = async (id, updateData) => {
  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimenstions,
    weight,
    sku,
  } = updateData;

  // Validate updates (example)
  if (countInStock && countInStock < 0) {
    throw new Error("Count in stock cannot be negative");
  }
  if (price && price < 0) {
    throw new Error("Price cannot be negative");
  }

  const product = await updateProductById(id, {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimenstions,
    weight,
    sku,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return { message: "Product updated successfully", product };
};

const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("id not found");
  }

  const product = await deleteProductById(id);

  if (!product) {
    throw new Error("Product Not Delete");
  }

  return { message: "Product deleted successfully", product };
};
export { addProduct, getProductById, updateProduct, deleteProduct };
