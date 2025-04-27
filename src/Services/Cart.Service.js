import {
  addNewCart,
  findCartByUserId,
  updateCartById,
} from "../Repository/Cart.Repo.js";
import { findProductById } from "../Repository/Product.Repo.js";

//helper function to get the cart
const getCart = async (userId, guestId) => {
  if (userId) {
    return await findCartByUserId({ userId });
  } else if (guestId) {
    return await findCartByUserId({ guestId });
  } else {
    return null;
  }
};

const addCart = async (cartData) => {
  const { productId, quantity, size, color, guestId, userId } = cartData;

  //first find the product first
  const product = await findProductById(productId);

  if (!product) {
    throw { message: "product not found" };
  }

  //determine whether user is logged-in or guest
  let cart = await getCart(userId, guestId);
  console.log(cart);
  //if the cart exist update it
  if (cart) {
    const productindex = cart.products.findIndex(
      (prod) =>
        prod.productId.toString() === productId &&
        prod.size === size &&
        prod.color === color
    );

    //if product already exist in cart just increase the qyantity
    if (productindex > -1) {
      cart.products[productindex].quantity = Number(quantity);
    } else {
      //add new product
      cart.products.push({
        productId,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
        size,
        color,
        quantity,
      });
    }

    //Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log("totalPrice : ", typeof cart.totalPrice);

    await cart.save();
    return { message: "product added to cart successfully", cart };
  } else {
    const newcart = await addNewCart({
      user: userId ? userId : undefined,
      guestId: guestId ? guestId : "guest" + new Date().getTime(),
      products: [
        {
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        },
      ],

      totalPrice: Number(product.price * quantity),
    });

    if (!newcart) {
      throw new Error({ message: "cart not created" });
    }
    return { message: "cart Created", newcart };
  }
};

const updateCart = async (updatedData) => {
  const { userId, guestId, productId, size, color, quantity } = updatedData;

  let cart = await getCart(userId, guestId);
  // console.log(cart);
  if (cart) {
    const productindex = cart.products.findIndex(
      (prod) =>
        prod.productId.toString() === productId &&
        prod.size === size &&
        prod.color === color
    );

    console.log(productindex);

    //if product exist
    if (productindex > -1) {
      if (quantity > 0) {
        console.log(quantity);
        cart.products[productindex].quantity = Number(quantity);
      } else {
        cart.products.splice(productindex, 1);
      }
    } else {
      const product = await findProductById(productId);
      cart.products.push({
        productId,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
        size,
        color,
        quantity,
      });
    }

    //Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedCart = await updateCartById(cart._id, cart);
    if (!updatedCart) {
      throw new Error({ message: "can not update cart" });
    }
    return updatedCart;
  }
};

export { addCart, updateCart };
