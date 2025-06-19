import { User } from "../Models/User.Model.js";
import ApiError from "../Utils/ApiError.js";

const findUserById = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid user ID");
  const user = await User.findById(id).select("-password");
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found");
  return user;
};

const findUserByEmail = async (email) => {
  if (!email) throw new ApiError(400, "INVALID_EMAIL", "Invalid email");
  return await User.findOne({ email }).select("-password");
};

const saveNewUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findUserByEmailWithPassword = async (email) => {
  if (!email) throw new ApiError(400, "INVALID_EMAIL", "Invalid email");
  return await User.findOne({ email });
};

const findAllUsers = async () => {
  return await User.find().select("-password");
};

const updateUser = async (id, updatedData) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid user ID");
  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).select("-password");
  if (!updatedUser) throw new ApiError(404, "USER_NOT_FOUND", "User not found");
  return updatedUser;
};

const deleteUser = async (id) => {
  if (!id) throw new ApiError(400, "INVALID_ID", "Invalid user ID");
  const deletedUser = await User.findByIdAndDelete(id).select("-password");
  if (!deletedUser) throw new ApiError(404, "USER_NOT_FOUND", "User not found");
  return deletedUser;
};

export {
  findAllUsers,
  updateUser,
  deleteUser,
  findUserByEmail,
  saveNewUser,
  findUserById,
  findUserByEmailWithPassword,
};
