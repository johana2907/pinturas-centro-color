import { getProductById } from "./products.service.js";
import { CartModel } from "../models/cart.model.js";

export async function createCart() {
  const cart = await CartModel.create({ products: [] });
  return cart;
}

export async function getCartById(cid) {
  return await CartModel.findById(cid);
}

export async function addProductToCart(cid, pid) {
  const product = await getProductById(pid);
  if (!product) return { error: "PRODUCT_NOT_FOUND" };

  const cart = await CartModel.findById(cid);
  if (!cart) return { error: "CART_NOT_FOUND" };

  const itemIndex = cart.products.findIndex(
    (item) => String(item.product) === String(pid)
  );

  if (itemIndex === -1) {
    cart.products.push({ product: pid, quantity: 1 });
  } else {
    cart.products[itemIndex].quantity += 1;
  }

  await cart.save();
  return cart;
}
