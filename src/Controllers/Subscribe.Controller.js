import {
  createSubscriber,
  getSubcribedUser,
} from "../Services/Subscribe.Service.js";

const CreateSubscriber = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await createSubscriber(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const GetSubcribedUser = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await getSubcribedUser(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { CreateSubscriber, GetSubcribedUser };
