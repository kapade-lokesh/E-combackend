// src/Models/Product.Model.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
    },
    countInStock: {
      type: Number,
      required: [true, "Count in stock is required"],
      min: [0, "Count in stock cannot be negative"],
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: [true, "SKU is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    sizes: {
      type: [String],
      required: [true, "Sizes are required"],
    },
    colors: {
      type: [String],
      required: [true, "Colors are required"],
    },
    collections: {
      type: String,
      required: [true, "Collection is required"],
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Men", "Women", "Unisex"],
        message: "Gender must be Men, Women, or Unisex",
      },
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required"],
        },
        altText: {
          type: String,
          trim: true,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
    },
    numReviews: {
      type: Number,
      default: 0,
      min: [0, "Number of reviews cannot be negative"],
    },
    tags: [{ type: String, trim: true }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    dimensions: {
      length: {
        type: Number,
        min: [0, "Length cannot be negative"],
      },
      width: {
        type: Number,
        min: [0, "Width cannot be negative"],
      },
      height: {
        type: Number,
        min: [0, "Height cannot be negative"],
      },
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
