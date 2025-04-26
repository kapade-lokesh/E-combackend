import {
  addNewProduct,
  deleteProductById,
  findBestSeller,
  findNewArrivals,
  findProductByCustomfilter,
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

const getFilteredProducts = async (query) => {
  const {
    collection,
    size,
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

  // filter logic
  if (collection && collection.toLocaleLowerCase() !== "all") {
    filteredQuery.collections = collection;
  }

  if (category && category.toLocaleLowerCase() !== "all") {
    filteredQuery.category = category;
  }

  if (material) {
    filteredQuery.material = { $in: material.split(",") };
  }

  if (brand) {
    filteredQuery.brand = { $in: brand.split(",") };
  }

  if (size) {
    filteredQuery.size = { $in: size.split(",") };
  }

  if (color) {
    filteredQuery.colors = { $in: [color] };
  }

  if (gender) {
    filteredQuery.gender = gender;
  }

  if (minPrice || maxPrice) {
    filteredQuery.price = {};
    if (minPrice) {
      filteredQuery.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filteredQuery.price.$lte = Number(maxPrice);
    }
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

  //Fetch products and apply sorting and limit
  const products = await findProductByCustomfilter(filteredQuery, limit, sort);

  if (!products) {
    throw new Error("Products not Found");
  }

  return { message: "Product fetched successfully", products };
};

const getSimilerProducts = async (params, query) => {
  console.log(query);
  const { id } = params;
  const { limit } = query;
  console.log(limit);
  const product = await findProductById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  const filterObj = {
    _id: { $ne: id },
    gender: product.gender,
    category: product.category,
  };

  const similerProducts = await findProductByCustomfilter(filterObj, limit);
  return { message: "Similer Products", similerProducts };
};

const getBestSeller = async () => {
  const product = await findBestSeller();
  console.log(product);
  if (!product) {
    throw new Error("Product not found");
  }
  return { message: "Best seller", product };
};

const getNewArrivals = async () => {
  const products = await findNewArrivals();
  if (!products) {
    throw new Error("Product not found");
  }

  return { message: "New Arrivals", products };
};

export {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
  getSimilerProducts,
  getBestSeller,
  getNewArrivals,
};
