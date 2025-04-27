import { addCart, updateCart } from "../Services/Cart.Service.js";

const AddCart = async (req, res) => {
  try {
    const result = await addCart(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    console.error("Error creating cart", error.message);
    res
      .status(500)
      .json({ message: "Error creating cart", error: error.message });
  }
};

const UpdateCart = async (req, res) => {
  try {
    const result = await updateCart(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    console.error("Error updating cart", error.message);
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

export { AddCart, UpdateCart };
