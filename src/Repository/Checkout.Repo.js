// src/Repository/Checkout.Repo.js
import { Checkout } from "../Models/Checkout.Model.js";
import ApiError from "../utils/ApiError.js";

const addNewCheckout = async (parameters) => {
  try {
    const checkout = await Checkout.create(parameters);
    return checkout;
  } catch (error) {
    throw new ApiError(
      500,
      "CREATE_FAILED",
      `Failed to create checkout: ${error.message}`
    );
  }
};

const findCheckoutById = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid checkout ID");
  const checkout = await Checkout.findById(id);
  if (!checkout)
    throw new ApiError(404, "CHECKOUT_NOT_FOUND", "Checkout not found");
  return checkout;
};

export { addNewCheckout, findCheckoutById };
