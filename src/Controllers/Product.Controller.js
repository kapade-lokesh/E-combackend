import { registerProduct } from "../Services/Product.Service.js";

const RegisterProduct = async (req, res) => {
  try {
    const product = await registerProduct(req.body, req.user);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
};



export { RegisterProduct };
