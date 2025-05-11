import {
  findUserByEmail,
  findUserByEmailWithPassword,
  findAllUsers,
  saveNewUser,
  updateUser,
  deleteUser,
} from "../Repository/User.Repo.js";
import jwt from "jsonwebtoken";

// Helper function to fetch user with password for login

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User Already Exists With Email");
  }

  // Register logic
  let user;
  try {
    user = await saveNewUser({ name, email, password, role });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new Error(`Validation failed: ${error.message}`);
    }
    throw new Error(`Failed to register user: ${error.message}`);
  }

  if (!user) {
    throw new Error("Operation failed");
  }

  return {
    message: "Register successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const loginUser = async (loginData) => {
  const { email, password } = loginData; // Removed unused 'name'

  // Check if user exists
  const user = await findUserByEmailWithPassword(email);
  if (!user) {
    throw new Error("User Not Exist With Email");
  }

  // Check password match
  const isPasswordCorrect = await user.matchPassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  // Create auth token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const getAllUsers = async () => {
  const users = await findAllUsers();

  if (!users) {
    return { message: "users not found" };
  }
  return { message: "users", users };
};

const modifyUser = async (id, updatedData) => {
  const updaeduser = await updateUser(id, updatedData);
  if (!updateUser) {
    return { message: "users not updated" };
  }
  return { message: "users", updaeduser };
};

const removeUser = async (id) => {
  if (!id) {
    return { message: "plese provide id" };
  }
  const user = await deleteUser(id);

  if (!user) {
    return { message: "users not found cant complete action" };
  }
  return { message: "users", user };
};

export { registerUser, loginUser, getAllUsers, modifyUser, removeUser };
