// src/Controllers/Checkout.Controller.js
import {
  addCheckout,
  updateCheckout,
  finalizeCheckout,
} from "../Services/Checkout.Service.js";

const AddCheckout = async (req, res) => {
  const result = await addCheckout(req.body, req.user);
  res.status(201).json(result);
};

const UpdateCheckout = async (req, res) => {
  const result = await updateCheckout(req.body, req.params);
  res.status(200).json(result);
};

const FinalizeCheckout = async (req, res) => {
  const result = await finalizeCheckout(req.params);
  res.status(200).json(result);
};

export { AddCheckout, UpdateCheckout, FinalizeCheckout };
