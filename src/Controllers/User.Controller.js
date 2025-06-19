import {
  loginUser,
  registerUser,
  getAllUsers,
  modifyUser,
  removeUser,
} from "../Services/User.Service.js";
import ApiResponse from "../Utils/ApiResponse.js";

const RegisterUser = async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json(result);
};

const LoginUser = async (req, res) => {
  const result = await loginUser(req.body);
  res.status(200).json(result);
};

const GetUserProfile = async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse({ user: req.user }, "Profile retrieved successfully")
    );
};

const GetAllUsers = async (req, res) => {
  const result = await getAllUsers();
  res.status(200).json(result);
};

const ModifyUser = async (req, res) => {
  const { id } = req.params;
  const result = await modifyUser(id, req.body);
  res.status(200).json(result);
};

const RemoveUser = async (req, res) => {
  const { id } = req.params;
  const result = await removeUser(id);
  res.status(200).json(result);
};

export {
  RegisterUser,
  LoginUser,
  GetUserProfile,
  GetAllUsers,
  ModifyUser,
  RemoveUser,
};
