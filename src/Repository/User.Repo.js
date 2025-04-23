import { User } from "../Models/User.Model.js";

const findByID = async (id) => {
  return await User.findById(id).select("-password");
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const saveUser = async (parameters) => {
  const user = new User(parameters);
  return await user.save();
};

export { findByEmail, saveUser, findByID };
