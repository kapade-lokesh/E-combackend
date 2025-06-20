// src/Controllers/Subscribe.Controller.js
import {
  createSubscriber,
  getSubscribedUser,
} from "../Services/Subscribe.Service.js";

const CreateSubscriber = async (req, res) => {
  const { email } = req.body;
  const result = await createSubscriber(email);
  res.status(201).json(result);
};

const GetSubscribedUser = async (req, res) => {
  const { email } = req.body;
  const result = await getSubscribedUser(email);
  res.status(200).json(result);
};

export { CreateSubscriber, GetSubscribedUser };
