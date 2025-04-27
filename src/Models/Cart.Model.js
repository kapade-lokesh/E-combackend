import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartItemSchema = Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },

    products: [cartItemSchema],

    totalPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Cart = model("Cart", cartSchema);
