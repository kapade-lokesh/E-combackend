import {
  deleteOrder,
  findAllOrders,
  findOrderById,
  getOrderByUser,
} from "../Repository/Order.Repo.js";

const getUserOrders = async (parameters) => {
  const filter = { user: parameters._id };

  const orders = await getOrderByUser(filter);

  if (!orders) {
    return { message: "orders not found" };
  }

  return { message: "orders", orders };
};

const getOrderByID = async (parameters) => {
  const order = await findOrderById(parameters);
  if (!order) {
    return { message: "order not found with this id" };
  }
  return { message: "orders", order };
};

const getallOrders = async () => {
  const orders = await findAllOrders();
  if (!orders) {
    return { meassage: "orders not found" };
  }

  return { message: "orders", orders };
};

const modifyOrder = async (id, data) => {
  const order = await findOrderById(id);
  const { status } = data;

  if (order) {
    order.status = status || order.status;

    status === "Delivered"
      ? ((order.status = "Delivered"), (order.isDelivered = true))
      : (order.status, order.isDelivered);
    order.isDelivered === true
      ? (order.deliveredAt = Date.now())
      : order.deliveredAt;
  }

  await order.save();

  return { message: "order status updated", order };
};

const removeOrder = async (id) => {
  const deletedOrder = await deleteOrder(id);

  if (!deletedOrder) {
    return { message: "fail to delete order" };
  }

  return { message: "order deleted successfully", deletedOrder };
};
export { getUserOrders, getOrderByID, getallOrders, modifyOrder, removeOrder };
