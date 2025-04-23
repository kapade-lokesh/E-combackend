import { User } from "../Models/User.Model.js";
import { loginUser, registerUser } from "../Services/User.Service.js";

//Register User
const RegisterUser = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
};
export { RegisterUser, LoginUser, GetUserProfile };
