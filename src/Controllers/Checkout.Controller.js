import {
  addCheckOut,
  updateCheckOut,
  finalizeCheckout,
} from "../Services/Checkout.Service.js";

const AddCheckout = async (req, res) => {
  try {
    const result = await addCheckOut(req.body, req.user);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const UpdateCheckout = async (req, res) => {
  try {
    const result = await updateCheckOut(req.body, req.params);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const FinalizeCheckout = async (req, res) => {
  try {
    const result = await finalizeCheckout(req.params);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { AddCheckout, UpdateCheckout, FinalizeCheckout };
