import { readFile, writeFile } from "node:fs/promises";
import { getProductById } from "./products.service.js";

const fileUrl = new URL("../data/carts.json", import.meta.url);

async function readCarts() {
  const raw = await readFile(fileUrl, "utf-8");
  return JSON.parse(raw);
}

async function writeCarts(carts) {
  await writeFile(fileUrl, JSON.stringify(carts, null, 2), "utf-8");
}

export async function createCart() {
  const carts = await readCarts();
  const nextId = (carts.at(-1)?.id ?? 0) + 1;

  const newCart = {
    id: nextId,
    products: [] // [{ product: pid, quantity }]
  };

  carts.push(newCart);
  await writeCarts(carts);
  return newCart;
}

export async function getCartById(cid) {
  const carts = await readCarts();
  return carts.find((c) => String(c.id) === String(cid)) ?? null;
}

export async function addProductToCart(cid, pid) {
    
  //  aqui valido que existe el producto

  const product = await getProductById(pid);
  if (!product) return { error: "PRODUCT_NOT_FOUND" };

  const carts = await readCarts();
  const cartIdx = carts.findIndex((c) => String(c.id) === String(cid));
  if (cartIdx === -1) return { error: "CART_NOT_FOUND" };

  const cart = carts[cartIdx];

  const itemIdx = cart.products.findIndex((i) => String(i.product) === String(pid));
  if (itemIdx === -1) {
    cart.products.push({ product: Number.isNaN(Number(pid)) ? pid : Number(pid), quantity: 1 });
  } else {
    cart.products[itemIdx].quantity += 1;
  }

  carts[cartIdx] = cart;
  await writeCarts(carts);

  return cart;
}
