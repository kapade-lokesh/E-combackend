// src/Services/Order.Service.js
import {
  addNewOrder,
  deleteOrder,
  findAllOrders,
  findOrderById,
  getOrderByUser,
  updateOrderStatus,
} from "../Repository/Order.Repo.js";
import { findCartByUserId, deleteCartById } from "../Repository/Cart.Repo.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const addOrder = async (orderData, user) => {
  const { shippingAddress, paymentMethod } = orderData;

  if (!shippingAddress || !paymentMethod) {
    throw new ApiError(
      400,
      "MISSING_FIELDS",
      "Shipping address and payment method are required"
    );
  }

  const cart = await findCartByUserId({ userId: user._id });
  if (!cart || !cart.products.length) {
    throw new ApiError(400, "EMPTY_CART", "Cart is empty");
  }

  const orderItems = cart.products.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
  }));

  const order = await addNewOrder({
    user: user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice: cart.totalPrice,
  });

  await deleteCartById(cart._id); // Clear cart after order creation

  return new ApiResponse({ order }, "Order created successfully");
};

const getUserOrders = async (user) => {
  const orders = await getOrderByUser({ user: user._id });
  return new ApiResponse(
    { orders },
    orders.length ? "Orders retrieved successfully" : "No orders found"
  );
};

const getOrderById = async (id) => {
  const order = await findOrderById(id);
  return new ApiResponse({ order }, "Order retrieved successfully");
};

const getAllOrders = async () => {
  const orders = await findAllOrders();
  return new ApiResponse(
    { orders },
    orders.length ? "Orders retrieved successfully" : "No orders found"
  );
};

const modifyOrder = async (id, data) => {
  const { status } = data;

  if (!status) {
    throw new ApiError(400, "MISSING_FIELDS", "Status is required");
  }

  const order = await findOrderById(id);
  const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "INVALID_STATUS", "Invalid order status");
  }

  order.status = status;
  if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  } else if (status === "Cancelled") {
    order.isDelivered = false;
    order.deliveredAt = null;
  }

  const updatedOrder = await updateOrderStatus(id, order);
  return new ApiResponse(
    { order: updatedOrder },
    "Order status updated successfully"
  );
};

const removeOrder = async (id) => {
  const deletedOrder = await deleteOrder(id);
  return new ApiResponse({ order: deletedOrder }, "Order deleted successfully");
};

export {
  addOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  modifyOrder,
  removeOrder,
};
