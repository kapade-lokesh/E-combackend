// src/Repository/Subscribe.Repo.js
import { Subscribe } from "../Models/Subscribe.Model.js";
import ApiError from "../utils/ApiError.js";

const addNewSubscriber = async (email) => {
  try {
    const subscribedUser = new Subscribe({ email });
    return await subscribedUser.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, "DUPLICATE_EMAIL", "Email is already subscribed");
    }
    throw new ApiError(
      500,
      "CREATE_FAILED",
      `Failed to subscribe: ${error.message}`
    );
  }
};

const findSubscribedUser = async (email) => {
  return await Subscribe.findOne({ email });
};

export { addNewSubscriber, findSubscribedUser };
