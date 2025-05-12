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

// * routes for admin  findAllorders updateOrderStatus deleteOrder

const findAllOrders = async () => {
  const orders = await Order.find().populate("user", "name,email");
  return orders;
};

const updateOrderStaus = async (id, updatedData) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return updatedOrder;
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder;
};
export {
  addNewOrder,
  getOrderByUser,
  findOrderById,
  findAllOrders,
  updateOrderStaus,
  deleteOrder,
};
