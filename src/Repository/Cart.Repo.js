import { Cart } from "../Models/Cart.Model.js";

const addNewCart = async (cartData) => {
  const cart = new Cart(cartData);
  await cart.save();

  return cart;
};

const findCartByUserId = async (id) => {
  const { userId, guestId } = id;

  if (userId) {
    return await Cart.findOne({ user: userId });
  } else {
    return await Cart.findOne({ guestId });
  }
};

const updateCartById = async (id, updatedCartData) => {
  const cart = await Cart.findByIdAndUpdate(id, updatedCartData, { new: true });

  return cart;
};

const deleteCartById = async (id) => {
  const deletedProduct = await Cart.findByIdAndDelete(id, { new: true });
  return deletedProduct;
};
export { addNewCart, findCartByUserId, updateCartById, deleteCartById };
