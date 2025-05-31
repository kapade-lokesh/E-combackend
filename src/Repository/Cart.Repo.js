import { Cart } from "../Models/Cart.Model.js";

const addNewCart = async (cartData) => {
  const cart = new Cart(cartData);
  await cart.save();

  return cart;
};

const findCartByUserId = async (id) => {
  const { userId, guestId } = id;

  if (userId) {
    console.log("calling with user id");
    return await Cart.findOne({ user: userId });
  } else {
    const data = await Cart.findOne({ guestId: guestId });

    return data;
  }
};

const updateCartById = async (id, updatedCartData) => {
  const cart = await Cart.findByIdAndUpdate(id, updatedCartData, { new: true });

  return cart;
};

const deleteCartById = async (id) => {
  const deletedCart = await Cart.findByIdAndDelete(id, { new: true });
  return deletedCart;
};

const deleteCartByField = async (field) => {
  console.log(field);
  const deletedCart = await Cart.findOneAndDelete(field);
  console.log(deletedCart);
  return deletedCart;
};
export {
  addNewCart,
  findCartByUserId,
  updateCartById,
  deleteCartById,
  deleteCartByField,
};
