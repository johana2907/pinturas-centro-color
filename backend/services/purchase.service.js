import { CartModel } from "../models/cart.model.js";
import { TicketModel } from "../models/ticket.model.js";
import { generateTicketCode } from "../utils/generateTicketCode.js";
import { getProductById, updateProduct } from "./products.service.js";

export async function purchaseCart(cartId, purchaserEmail) {
  const cart = await CartModel.findById(cartId);

  if (!cart) {
    return { error: "CART_NOT_FOUND" };
  }

  const productsToPurchase = [];
  const productsNotPurchased = [];

  for (const item of cart.products) {
    const product = await getProductById(item.product);

    if (!product) continue;

    if (product.stock >= item.quantity) {
      productsToPurchase.push({ item, product });
    } else {
      productsNotPurchased.push(item);
    }
  }

  let totalAmount = 0;

  for (const { item, product } of productsToPurchase) {
    const newStock = product.stock - item.quantity;

    await updateProduct(product.id, { stock: newStock });

    totalAmount += product.price * item.quantity;
  }

  const ticket = await TicketModel.create({
    code: generateTicketCode(),
    amount: totalAmount,
    purchaser: purchaserEmail
  });

  cart.products = productsNotPurchased;
  await cart.save();

  return {
    ticket,
    productsNotPurchased
  };
}