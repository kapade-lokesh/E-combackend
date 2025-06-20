// src/Repository/Cart.Repo.js
import { Cart } from "../Models/Cart.Model.js";
import ApiError from "../utils/ApiError.js";

const addNewCart = async (cartData) => {
  try {
    const cart = new Cart(cartData);
    return await cart.save();
  } catch (error) {
    throw new ApiError(
      500,
      "CREATE_FAILED",
      `Failed to create cart: ${error.message}`
    );
  }
};

const findCartByUserId = async ({ userId, guestId }) => {
  if (!userId && !guestId) {
    throw new ApiError(400, "INVALID_ID", "User ID or Guest ID is required");
  }
  return await Cart.findOne(userId ? { user: userId } : { guestId });
};

const updateCartById = async (id, updatedCartData) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Cart ID is required");
  const cart = await Cart.findByIdAndUpdate(id, updatedCartData, { new: true });
  if (!cart) throw new ApiError(404, "CART_NOT_FOUND", "Cart not found");
  return cart;
};

const deleteCartById = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Cart ID is required");
  const deletedCart = await Cart.findByIdAndDelete(id);
  if (!deletedCart) throw new ApiError(404, "CART_NOT_FOUND", "Cart not found");
  return deletedCart;
};

export { addNewCart, findCartByUserId, updateCartById, deleteCartById };
