import { findByEmail, saveUser } from "../Repository/User.Repo.js";
import jwt from "jsonwebtoken";
const registerUser = async (parameters) => {
  const { name, email, password, role } = parameters;

  try {
    //check if user already exist
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return { message: "User Already Exist With Email" };
    }

    //register logic
    const user = await saveUser({ name, email, password, role });

    if (!user) {
      return { message: "Operation fail" };
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
  } catch (error) {
    console.log(error);
    return error;
  }
};

const loginUser = async (parameters) => {
  const { name, email, password } = parameters;
  //check user exist or not
  try {
    const user = await findByEmail(email);
    if (!user) {
      return { message: "User Not Exist With Email" };
    }

    //chek for the password match or not
    const isPassCorrect = await user.matchPassword(password);

    if (!isPassCorrect) {
      return { message: "invalid credentials" };
    }

    //create authtoken
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { registerUser, loginUser };
