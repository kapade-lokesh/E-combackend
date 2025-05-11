import { Subscribe } from "../Models/Subcribe.Model.js";

const addNewSubscriber = async (email) => {
  const subscibeduser = await new Subscribe(email);
  await subscibeduser.save();
  return subscibeduser;
};

const findSubcribedUser = async (email) => {
  const subscibeduser = await Subscribe.findOne(email);
  return subscibeduser;
};

export { addNewSubscriber, findSubcribedUser };
