import {
  addCart,
  deleteCart,
  getCart,
  mergeCart,
  updateCart,
} from "../Services/Cart.Service.js";

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

const DeleteCart = async (req, res) => {
  console.log("cart contoller ", req.body);
 
  try {
    const result = await deleteCart(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({ message: "Error while deleting cart", error: error.message });
  }
};

const GetCart = async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const result = await getCart(userId, guestId);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      message: "cart not found",
      error: error.message,
    });
  }
};

const MergeCart = async (req, res) => {
  try {
    const result = await mergeCart(req.body, req.user);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      message: "cart not found",
      error: error.message,
    });
  }
};
export { AddCart, UpdateCart, DeleteCart, GetCart, MergeCart };
