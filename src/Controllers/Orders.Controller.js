import {
  getUserOrders,
  getOrderByID,
  getallOrders,
  modifyOrder,
  removeOrder,
} from "../Services/Order.Service.js";

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

const GetAllOrders = async (req, res) => {
  try {
    const result = await getallOrders();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const ModifyOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await modifyOrder(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const RemoveOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await removeOrder(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export { GetUserOrders, GetOrderByID, GetAllOrders, ModifyOrder, RemoveOrder };
