import { createProduct, findProductById } from "../Repository/Product.Repo.js";

const registerProduct = async (parameters, userdata) => {
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
  } = parameters;

  try {
    const product = await createProduct({
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
      user: userdata._id,
    });

    return { message: "Product Created Successfuly", product };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findProduct = async (id) => {
  try {
    const product = await findProductById(id);
    return product;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (paramsid) => {
  try {
    const updateProduct = await findProduct(paramsid);
  } catch (error) {}
};
export { registerProduct, findProduct };
