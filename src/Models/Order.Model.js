// src/Models/Order.Model.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderItemsSchema = Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    size: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false }
);

const orderSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    orderItems: {
      type: [orderItemsSchema],
      required: [true, "Order items are required"],
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must have at least one item",
      },
    },
    shippingAddress: {
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      city: { type: String, required: [true, "City is required"], trim: true },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
      },
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["Pending", "Completed", "Failed"],
        message: "Payment status must be Pending, Completed, or Failed",
      },
      default: "Pending",
    },
    status: {
      type: String,
      enum: {
        values: ["Processing", "Shipped", "Delivered", "Cancelled"],
        message: "Status must be Processing, Shipped, Delivered, or Cancelled",
      },
      default: "Processing",
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
