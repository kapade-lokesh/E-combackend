import {
  loginUser,
  registerUser,
  getAllUsers,
  modifyUser,
  removeUser,
} from "../Services/User.Service.js";

// Register User
const RegisterUser = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(error.message.includes("Exists") ? 400 : 500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    console.error("Error logging in:", error.message);
    res
      .status(
        error.message.includes("Exist") || error.message.includes("credentials")
          ? 400
          : 500
      )
      .json({
        message: "Error logging in",
        error: error.message,
      });
  }
};

const GetUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile retrieved successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Error retrieving profile:", error.message);
    res.status(500).json({
      message: "Error retrieving profile",
      error: error.message,
    });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const result = await getAllUsers();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while fetching users", error: error.message });
  }
};

const ModifyUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await modifyUser(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while modifying user", error: error.message });
  }
};

const RemoveUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await removeUser(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while modifying user", error: error.message });
  }
};

export {
  RegisterUser,
  LoginUser,
  GetUserProfile,
  GetAllUsers,
  ModifyUser,
  RemoveUser,
};
