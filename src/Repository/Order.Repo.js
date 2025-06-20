// src/Repository/Order.Repo.js
import { Order } from "../Models/Order.Model.js";
import ApiError from "../utils/ApiError.js";

const addNewOrder = async (parameters) => {
  try {
    const order = new Order(parameters);
    return await order.save();
  } catch (error) {
    throw new ApiError(
      500,
      "CREATE_FAILED",
      `Failed to create order: ${error.message}`
    );
  }
};

const findOrderById = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid order ID");
  const order = await Order.findById(id).populate("user", "name email");
  if (!order) throw new ApiError(404, "ORDER_NOT_FOUND", "Order not found");
  return order;
};

const getOrderByUser = async (filter) => {
  if (!filter.user)
    throw new ApiError(400, "INVALID_USER", "User ID is required");
  return await Order.find(filter).sort({ createdAt: -1 });
};

const findAllOrders = async () => {
  return await Order.find().populate("user", "name email");
};

const updateOrderStatus = async (id, updatedData) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid order ID");
  const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedOrder)
    throw new ApiError(404, "ORDER_NOT_FOUND", "Order not found");
  return updatedOrder;
};

const deleteOrder = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid order ID");
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder)
    throw new ApiError(404, "ORDER_NOT_FOUND", "Order not found");
  return deletedOrder;
};

export {
  addNewOrder,
  getOrderByUser,
  findOrderById,
  findAllOrders,
  updateOrderStatus,
  deleteOrder,
};
