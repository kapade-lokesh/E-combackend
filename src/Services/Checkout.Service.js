import { deleteCartByField } from "../Repository/Cart.Repo.js";
import {
  addNewCheckout,
  findCheckoutByid,
} from "../Repository/Checkout.Repo.js";
import { addNewOrder } from "../Repository/Order.Repo.js";

const addCheckOut = async (parameters, user) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    parameters;

  if (!checkoutItems || checkoutItems.length < 0) {
    return { message: "no checkout-items provided" };
  }

  const newCheckout = await addNewCheckout({
    user: user._id,
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });
  return { message: "checkout created sucessfullly", newCheckout };
};

const updateCheckOut = async (parameters, params) => {
  const { paymentStatus, paymentDetails } = parameters;
  const { id } = params;

  const checkout = await findCheckoutByid(id);

  if (!checkout) {
    return { message: "chekcout is not found" };
  }

  if (paymentStatus === "paid") {
    (checkout.isPaid = true),
      (checkout.paymentStatus = paymentStatus),
      (checkout.paymentDetails = paymentDetails),
      (checkout.paidAt = Date.now());
  }

  await checkout.save();

  return { message: "chekcout updated sucessfuly", checkout };
};

const finalizeCheckout = async (params) => {
  const { id } = params;

  const checkout = await findCheckoutByid(id);

  if (!checkout) {
    return { message: "chekcout is not found" };
  }

  if (checkout.isPaid && !checkout.isFinalized) {
    const finalOrder = await addNewOrder({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      patmentStatus: "paid",
      paymentDetails: checkout.paymentDetails,
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();
    await deleteCartByField({ user: checkout.user });

    return { message: "final order", finalOrder };
  } else if (checkout.isFinalized) {
    return { message: "checkout already finalized", checkout };
  } else {
    return { message: "checkout is not paid", checkout };
  }
};
export { addCheckOut, updateCheckOut, finalizeCheckout };
