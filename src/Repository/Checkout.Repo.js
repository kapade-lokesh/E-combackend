import { Chekout } from "../Models/Checkout.Model.js";

const addNewCheckout = async (parameters) => {
  const checkout = await Chekout.create(parameters);
  return checkout;
};

const findCheckoutByid = async (id) => {
  const checkout = await Chekout.findById(id);
  return checkout;
};

export { addNewCheckout, findCheckoutByid };
