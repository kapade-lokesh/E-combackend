import { Order } from "../Models/Order.Model.js";

const addNewOrder = async (parameters) => {
  const order = new Order(parameters);
  await order.save();
  return order;
};

export { addNewOrder };
