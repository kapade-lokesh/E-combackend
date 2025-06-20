// src/Services/Checkout.Service.js
import { deleteCartById } from "../Repository/Cart.Repo.js";
import {
  addNewCheckout,
  findCheckoutById,
} from "../Repository/Checkout.Repo.js";
import { addNewOrder } from "../Repository/Order.Repo.js";
import { razorpay } from "../Config/RazorpayConfig.js";
import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const addCheckout = async (parameters, user) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    parameters;

  if (
    !checkoutItems?.length ||
    !shippingAddress ||
    !paymentMethod ||
    !totalPrice
  ) {
    throw new ApiError(400, "MISSING_FIELDS", "Required fields are missing");
  }

  const newCheckout = await addNewCheckout({
    user: user._id,
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  try {
    const order = await razorpay.orders.create({
      amount: totalPrice * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${newCheckout._id}`,
      notes: {
        checkout_id: newCheckout._id.toString(),
        user_id: user._id.toString(),
      },
    });

    return new ApiResponse(
      { checkout: newCheckout, razorpayOrderId: order.id },
      "Checkout created successfully"
    );
  } catch (error) {
    await Checkout.findByIdAndDelete(newCheckout._id); // Rollback on Razorpay failure
    throw new ApiError(
      500,
      "RAZORPAY_FAILED",
      `Failed to create Razorpay order: ${error.message}`
    );
  }
};

const updateCheckout = async (parameters, params) => {
  const { paymentStatus, paymentDetails } = parameters;
  const { id } = params;

  if (!paymentStatus) {
    throw new ApiError(400, "MISSING_FIELDS", "Payment status is required");
  }

  const validStatuses = ["Pending", "Completed", "Failed"];
  if (!validStatuses.includes(paymentStatus)) {
    throw new ApiError(400, "INVALID_STATUS", "Invalid payment status");
  }

  const checkout = await findCheckoutById(id);

  if (paymentStatus === "Completed") {
    checkout.isPaid = true;
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = new Date();
  } else {
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
  }

  await checkout.save();

  return new ApiResponse({ checkout }, "Checkout updated successfully");
};

const finalizeCheckout = async (params) => {
  const { id } = params;

  const checkout = await findCheckoutById(id);

  if (checkout.isFinalized) {
    throw new ApiError(400, "ALREADY_FINALIZED", "Checkout already finalized");
  }

  if (!checkout.isPaid) {
    throw new ApiError(400, "NOT_PAID", "Checkout is not paid");
  }

  const order = await addNewOrder({
    user: checkout.user,
    orderItems: checkout.checkoutItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    })),
    shippingAddress: checkout.shippingAddress,
    paymentMethod: checkout.paymentMethod,
    totalPrice: checkout.totalPrice,
    isPaid: true,
    paidAt: checkout.paidAt,
    paymentStatus: "Completed",
    paymentDetails: checkout.paymentDetails,
  });

  checkout.isFinalized = true;
  checkout.finalizedAt = new Date();
  await checkout.save();

  await deleteCartById(checkout.user); // Clear user cart

  return new ApiResponse(
    { order },
    "Checkout finalized and order created successfully"
  );
};

export { addCheckout, updateCheckout, finalizeCheckout };
