import {
  findSubcribedUser,
  addNewSubscriber,
} from "../Repository/Subscribe.Repo.js";

const createSubscriber = async (email) => {
  if (!email) {
    return { message: "provide email" };
  }
  const user = await addNewSubscriber({ email });

  if (!user) {
    return { message: "user not subscribed with this email" };
  }

  return { message: "Subscribed user reated", user };
};

export { findSubcribedUser };

const getSubcribedUser = async (email) => {
  if (!email) {
    return { message: "provide email" };
  }
  const user = await findSubcribedUser({ email });

  if (!user) {
    return { message: "user not subscribed with this email" };
  }

  return { message: "Subscribed user", user };
};

export { createSubscriber, getSubcribedUser };
