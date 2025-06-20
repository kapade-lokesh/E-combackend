// src/Controllers/Order.Controller.js
import {
  addOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  modifyOrder,
  removeOrder,
} from "../Services/Order.Service.js";

const AddOrder = async (req, res) => {
  const result = await addOrder(req.body, req.user);
  res.status(201).json(result);
};

const GetUserOrders = async (req, res) => {
  const result = await getUserOrders(req.user);
  res.status(200).json(result);
};

const GetOrderById = async (req, res) => {
  const { id } = req.params;
  const result = await getOrderById(id);
  res.status(200).json(result);
};

const GetAllOrders = async (req, res) => {
  const result = await getAllOrders();
  res.status(200).json(result);
};

const ModifyOrder = async (req, res) => {
  const { id } = req.params;
  const result = await modifyOrder(id, req.body);
  res.status(200).json(result);
};

const RemoveOrder = async (req, res) => {
  const { id } = req.params;
  const result = await removeOrder(id);
  res.status(200).json(result);
};

export {
  AddOrder,
  GetUserOrders,
  GetOrderById,
  GetAllOrders,
  ModifyOrder,
  RemoveOrder,
};
