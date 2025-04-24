import {
  findUserByEmail,
  findUserByEmailWithPassword,
  saveNewUser,
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

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

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

export { registerUser, loginUser };
