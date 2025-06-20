// src/Controllers/Cart.Controller.js
import {
  addCart,
  deleteCart,
  getCart,
  mergeCart,
  updateCart,
} from "../Services/Cart.Service.js";

const AddCart = async (req, res) => {
  const result = await addCart(req.body);
  res.status(201).json(result);
};

const UpdateCart = async (req, res) => {
  const result = await updateCart(req.body);
  res.status(200).json(result);
};

const DeleteCart = async (req, res) => {
  const result = await deleteCart(req.body);
  res.status(200).json(result);
};

const GetCart = async (req, res) => {
  const { userId, guestId } = req.query;
  const result = await getCart(userId, guestId);
  res.status(200).json(result);
};

const MergeCart = async (req, res) => {
  const { guestId } = req.body;
  const result = await mergeCart(guestId, req.user);
  res.status(200).json(result);
};

export { AddCart, UpdateCart, DeleteCart, GetCart, MergeCart };
