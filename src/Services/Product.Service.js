// src/Services/Product.Service.js
import {
  addNewProduct,
  deleteProductById,
  findAllProducts,
  findBestSeller,
  findNewArrivals,
  findProductByCustomfilter,
  findProductById,
  updateProductById,
} from "../Repository/Product.Repo.js";
import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";

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
    dimensions,
    weight,
    sku,
  } = productData;

  if (
    !name ||
    !price ||
    !countInStock ||
    !category ||
    !sizes ||
    !colors ||
    !collections ||
    !sku
  ) {
    throw new ApiError(400, "MISSING_FIELDS", "Required fields are missing");
  }

  if (price < 0 || discountPrice < 0 || countInStock < 0) {
    throw new ApiError(
      400,
      "INVALID_VALUES",
      "Price, discount price, or stock cannot be negative"
    );
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
    dimensions,
    weight,
    sku,
    user: userData._id,
  });

  return new ApiResponse({ product }, "Product added successfully");
};

const getProductById = async (id) => {
  const product = await findProductById(id);
  return new ApiResponse({ product }, "Product retrieved successfully");
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
    dimensions,
    weight,
    sku,
  } = updateData;

  if (countInStock < 0 || price < 0 || discountPrice < 0) {
    throw new ApiError(
      400,
      "INVALID_VALUES",
      "Price, discount price, or stock cannot be negative"
    );
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
    dimensions,
    weight,
    sku,
  });

  return new ApiResponse({ product }, "Product updated successfully");
};

const deleteProduct = async (id) => {
  const product = await deleteProductById(id);
  return new ApiResponse({ product }, "Product deleted successfully");
};

const getFilteredProducts = async (query) => {
  const {
    collection,
    sizes,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  } = query;

  let filteredQuery = {};

  if (collection && collection.toLowerCase() !== "all") {
    filteredQuery.collections = collection;
  }

  if (category && category.toLowerCase() !== "all") {
    filteredQuery.category = category;
  }

  if (material) {
    filteredQuery.material = { $in: material.split(",") };
  }

  if (brand) {
    filteredQuery.brand = { $in: brand.split(",") };
  }

  if (sizes) {
    filteredQuery.sizes = { $in: sizes.split(",") };
  }

  if (color) {
    filteredQuery.colors = { $in: [color] };
  }

  if (gender) {
    filteredQuery.gender = gender;
  }

  if (minPrice || maxPrice) {
    filteredQuery.price = {};
    if (minPrice) filteredQuery.price.$gte = Number(minPrice);
    if (maxPrice) filteredQuery.price.$lte = Number(maxPrice);
  }

  if (search) {
    filteredQuery.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sort = {};
  if (sortBy) {
    switch (sortBy) {
      case "priceAsc":
        sort = { price: 1 };
        break;
      case "priceDesc":
        sort = { price: -1 };
        break;
      case "popularity":
        sort = { rating: -1 };
        break;
      default:
        break;
    }
  }

  const products = await findProductByCustomfilter(filteredQuery, limit, sort);
  return new ApiResponse(
    { products },
    products.length ? "Products retrieved successfully" : "No products found"
  );
};

const getSimilarProducts = async (params, query) => {
  const { id } = params;
  const { limit } = query;

  const product = await findProductById(id);
  const filterObj = {
    _id: { $ne: id },
    gender: product.gender,
    category: product.category,
  };

  const products = await findProductByCustomfilter(filterObj, limit);
  return new ApiResponse(
    { products },
    "Similar products retrieved successfully"
  );
};

const getBestSeller = async () => {
  const product = await findBestSeller();
  return new ApiResponse({ product }, "Best seller retrieved successfully");
};

const getNewArrivals = async () => {
  const products = await findNewArrivals();
  return new ApiResponse(
    { products },
    products.length
      ? "New arrivals retrieved successfully"
      : "No new arrivals found"
  );
};

const getAllProducts = async () => {
  const products = await findAllProducts();
  return new ApiResponse(
    { products },
    products.length ? "Products retrieved successfully" : "No products found"
  );
};

export {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
  getSimilarProducts,
  getBestSeller,
  getNewArrivals,
  getAllProducts,
};
