// src/Services/Subscribe.Service.js
import {
  addNewSubscriber,
  findSubscribedUser,
} from "../Repository/Subscribe.Repo.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const createSubscriber = async (email) => {
  if (!email) {
    throw new ApiError(400, "MISSING_EMAIL", "Email is required");
  }

  const existingSubscriber = await findSubscribedUser(email);
  if (existingSubscriber) {
    throw new ApiError(400, "DUPLICATE_EMAIL", "Email is already subscribed");
  }

  const subscriber = await addNewSubscriber(email);
  return new ApiResponse({ subscriber }, "Subscribed successfully");
};

const getSubscribedUser = async (email) => {
  if (!email) {
    throw new ApiError(400, "MISSING_EMAIL", "Email is required");
  }

  const subscriber = await findSubscribedUser(email);
  if (!subscriber) {
    throw new ApiError(
      404,
      "SUBSCRIBER_NOT_FOUND",
      "No subscriber found with this email"
    );
  }

  return new ApiResponse({ subscriber }, "Subscriber retrieved successfully");
};

export { createSubscriber, getSubscribedUser };
