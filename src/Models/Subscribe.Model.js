// src/Models/Subscribe.Model.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const subscribeSchema = Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Subscribe = model("Subscribe", subscribeSchema);