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

// **  functions for admin user getAllUsers,updateUser,deleteUser

const findAllUsers = async () => {
  const users = await User.find();
  return users;
};

const updateUser = async (id, updatedData) => {
  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);

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
