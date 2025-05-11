import mongoose from "mongoose";

const { Schema, model } = mongoose;

const subscribeSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please enter valid email",
    ],
  },

  subscribeAt: {
    type: Date,
    default: Date.now,
  },
});

export const Subscribe = model("subscibe", subscribeSchema);
