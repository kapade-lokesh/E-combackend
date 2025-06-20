// src/Services/Cart.Service.js
import {
  addNewCart,
  deleteCartById,
  findCartByUserId,
  updateCartById,
} from "../Repository/Cart.Repo.js";
import { findProductById } from "../Repository/Product.Repo.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const getCart = async (userId, guestId) => {
  const cart = await findCartByUserId({ userId, guestId });
  if (!cart) {
    throw new ApiError(404, "CART_NOT_FOUND", "Cart not found");
  }
  return new ApiResponse({ cart }, "Cart retrieved successfully");
};

const addCart = async (cartData) => {
  const { productId, quantity, size, color, guestId, userId } = cartData;

  if (!productId || !quantity || !size || !color || (!userId && !guestId)) {
    throw new ApiError(400, "MISSING_FIELDS", "Required fields are missing");
  }

  if (quantity < 1) {
    throw new ApiError(400, "INVALID_QUANTITY", "Quantity must be at least 1");
  }

  const product = await findProductById(productId);
  let cart = await findCartByUserId({ userId, guestId });

  if (cart) {
    const productIndex = cart.products.findIndex(
      (prod) =>
        prod.productId.toString() === productId &&
        prod.size === size &&
        prod.color === color
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = Number(quantity);
    } else {
      cart.products.push({
        productId,
        name: product.name,
        image: product.images[0]?.url,
        price: product.price,
        size,
        color,
        quantity: Number(quantity),
      });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedCart = await updateCartById(cart._id, cart);
    return new ApiResponse(
      { cart: updatedCart },
      "Product added to cart successfully"
    );
  } else {
    const newCart = await addNewCart({
      user: userId || undefined,
      guestId: guestId || `guest_${Date.now()}`,
      products: [
        {
          productId,
          name: product.name,
          image: product.images[0]?.url,
          price: product.price,
          size,
          color,
          quantity: Number(quantity),
        },
      ],
      totalPrice: Number(product.price * quantity),
    });

    return new ApiResponse({ cart: newCart }, "Cart created successfully");
  }
};

const updateCart = async (updatedData) => {
  const { userId, guestId, productId, size, color, quantity } = updatedData;

  if (!productId || !size || !color || (!userId && !guestId)) {
    throw new ApiError(400, "MISSING_FIELDS", "Required fields are missing");
  }

  const cart = await findCartByUserId({ userId, guestId });
  const product = await findProductById(productId);

  const productIndex = cart.products.findIndex(
    (prod) =>
      prod.productId.toString() === productId &&
      prod.size === size &&
      prod.color === color
  );

  if (productIndex > -1) {
    if (quantity > 0) {
      cart.products[productIndex].quantity = Number(quantity);
    } else {
      cart.products.splice(productIndex, 1);
    }
  } else {
    cart.products.push({
      productId,
      name: product.name,
      image: product.images[0]?.url,
      price: product.price,
      size,
      color,
      quantity: Number(quantity),
    });
  }

  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const updatedCart = await updateCartById(cart._id, cart);
  return new ApiResponse({ cart: updatedCart }, "Cart updated successfully");
};

const deleteCart = async (cartData) => {
  const { productId, userId, guestId, size, color } = cartData;

  if (!productId || !size || !color || (!userId && !guestId)) {
    throw new ApiError(400, "MISSING_FIELDS", "Required fields are missing");
  }

  await findProductById(productId); // Validates product
  const cart = await findCartByUserId({ userId, guestId });

  const productIndex = cart.products.findIndex(
    (prod) =>
      prod.productId.toString() === productId &&
      prod.size === size &&
      prod.color === color
  );

  if (productIndex === -1) {
    throw new ApiError(404, "PRODUCT_NOT_IN_CART", "Product not found in cart");
  }

  cart.products.splice(productIndex, 1);
  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const updatedCart = await updateCartById(cart._id, cart);
  return new ApiResponse(
    { cart: updatedCart },
    "Product removed from cart successfully"
  );
};

const mergeCart = async (guestId, user) => {
  if (!guestId || !user?._id) {
    throw new ApiError(
      400,
      "MISSING_FIELDS",
      "Guest ID and user ID are required"
    );
  }

  const guestCart = await findCartByUserId({ guestId });
  let userCart = await findCartByUserId({ userId: user._id });

  if (!guestCart) {
    if (userCart) {
      return new ApiResponse({ cart: userCart }, "User already has a cart");
    }
    throw new ApiError(404, "GUEST_CART_NOT_FOUND", "Guest cart not found");
  }

  if (!guestCart.products.length) {
    await deleteCartById(guestCart._id);
    return new ApiResponse({ cart: userCart || null }, "Guest cart was empty");
  }

  if (userCart) {
    guestCart.products.forEach((guestItem) => {
      const productIndex = userCart.products.findIndex(
        (userItem) =>
          userItem.productId.toString() === guestItem.productId.toString() &&
          userItem.size === guestItem.size &&
          userItem.color === guestItem.color
      );

      if (productIndex > -1) {
        userCart.products[productIndex].quantity += guestItem.quantity;
      } else {
        userCart.products.push(guestItem);
      }
    });

    userCart.totalPrice = userCart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedCart = await updateCartById(userCart._id, userCart);
    await deleteCartById(guestCart._id);
    return new ApiResponse({ cart: updatedCart }, "Cart merged successfully");
  } else {
    guestCart.user = user._id;
    guestCart.guestId = undefined;
    const updatedCart = await updateCartById(guestCart._id, guestCart);
    return new ApiResponse({ cart: updatedCart }, "Cart merged successfully");
  }
};

export { addCart, updateCart, deleteCart, getCart, mergeCart };
