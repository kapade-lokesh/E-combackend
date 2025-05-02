import {
  addNewCart,
  deleteCartById,
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

const deleteCart = async (cartData) => {
  const { productId, userId, guestId, size, color } = cartData;

  const product = await findProductById(productId);

  if (!product) {
    throw new Error({ message: "product not found" });
  }

  const cart = await getCart(userId, guestId);

  if (!cart) {
    throw new Error({ message: "cart not found" });
  }

  const productindex = cart.products.findIndex(
    (prod) =>
      prod.productId.toString() === productId &&
      prod.size === size &&
      prod.color === color
  );

  console.log("product index", productindex);

  if (productindex > -1) {
    cart.products.splice(productindex, 1);

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + Number(item.price * item.quantity),
      0
    );

    await cart.save();
    return { message: "product in cart removed", cart };
  } else {
    return { message: "product not found in cart" };
  }
};

const mergeCart = async (guestId, user) => {
   
  const guestCart = await findCartByUserId(guestId);
  const userCart = await findCartByUserId({ userId: user._id });
  
  if (guestCart) {
    if (guestCart.products.length < 0) {
      return { message: "cart is empty" };
    }

    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const productindex = userCart.products.findIndex(
          (userItem) =>
            userItem.productId.toString() === guestItem.productId.toString() &&
            userItem.size === guestItem.size &&
            userItem.color === guestItem.color
        );

        if (productindex > -1) {
          userCart.products[productindex].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();

      //removing the guest cart using guestId after sucessfull merge
      await deleteCartById(guestCart._id);
      return { message: "cart merge sucessfully", userCart };
    } else {
      guestCart.user = user._id;
      guestCart.guestId = undefined;
      await guestCart.save();
      return { message: "cart merge sucessfully", guestCart };
    }
  } else {
    if (userCart) {
      return { message: "alredy have a cart", userCart };
    }

    return { message: "guest cart was not found" };
  }
};

export { addCart, updateCart, deleteCart, getCart, mergeCart };
