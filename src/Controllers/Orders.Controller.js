import { getUserOrders, getOrderByID } from "../Services/Order.Service.js";

const GetUserOrders = async (req, res) => {
  try {
    const result = await getUserOrders(req.user);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const GetOrderByID = async (req, res) => {
  try {
    const result = await getOrderByID(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export { GetUserOrders, GetOrderByID };
