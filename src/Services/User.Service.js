import {
  findUserByEmail,
  findUserByEmailWithPassword,
  findAllUsers,
  saveNewUser,
  updateUser,
  deleteUser,
} from "../Repository/User.Repo.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../Utils/ApiError.js";
import ApiError from "../Utils/ApiResponse.js";

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(
      400,
      "USER_EXISTS",
      "User already exists with this email"
    );
  }

  // Register logic
  let user;
  try {
    user = await saveNewUser({ name, email, password, role });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ApiError(400, "VALIDATION_FAILED", error.message);
    }
    throw new ApiError(
      500,
      "REGISTRATION_FAILED",
      `Failed to register user: ${error.message}`
    );
  }

  return new ApiResponse(
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    "User registered successfully"
  );
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // Check if user exists
  const user = await findUserByEmailWithPassword(email);
  if (!user) {
    throw new ApiError(
      400,
      "USER_NOT_FOUND",
      "User does not exist with this email"
    );
  }

  // Check password match
  const isPasswordCorrect = await user.matchPassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "INVALID_CREDENTIALS", "Invalid password");
  }

  // Create auth token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return new ApiResponse(
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
    "Login successful"
  );
};

const getAllUsers = async () => {
  const users = await findAllUsers();
  return new ApiResponse(
    { users },
    users.length ? "Users retrieved successfully" : "No users found"
  );
};

const modifyUser = async (id, updatedData) => {
  if (!id) {
    throw new ApiError(400, "INVALID_ID", "Please provide a valid user ID");
  }
  const updatedUser = await updateUser(id, updatedData);
  return new ApiResponse({ user: updatedUser }, "User updated successfully");
};

const removeUser = async (id) => {
  if (!id) {
    throw new ApiError(400, "INVALID_ID", "Please provide a valid user ID");
  }
  const user = await deleteUser(id);
  return new ApiResponse({ user }, "User deleted successfully");
};

export { registerUser, loginUser, getAllUsers, modifyUser, removeUser };
