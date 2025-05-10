import { Order } from "../Models/Order.Model.js";

const addNewOrder = async (parameters) => {
  const order = new Order(parameters);
  await order.save();
  return order;
};

const findOrderById = async (id) => {
  const order = await Order.findById(id).populate("user", "name email");
  return order;
};

const getOrderByUser = async (filter) => {
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  return orders;
};

export { addNewOrder, getOrderByUser, findOrderById };
