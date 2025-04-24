import { User } from "../Models/User.Model.js";

const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("-password");
};

const saveNewUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findUserByEmailWithPassword = async (email) => {
  return await User.findOne({ email }); // No .select to include password
};
export { findUserByEmail, saveNewUser, findUserById,findUserByEmailWithPassword };