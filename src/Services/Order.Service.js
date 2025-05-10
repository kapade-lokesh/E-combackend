import { findOrderById, getOrderByUser } from "../Repository/Order.Repo.js";

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
export { getUserOrders, getOrderByID };
