import { readFile, writeFile } from "node:fs/promises";

const fileUrl = new URL("../data/products.json", import.meta.url);

async function readProducts() {
  const raw = await readFile(fileUrl, "utf-8");
  return JSON.parse(raw);
}

async function writeProducts(products) {
  await writeFile(fileUrl, JSON.stringify(products, null, 2), "utf-8");
}

export async function getAllProducts() {
  return await readProducts();
}

export async function getProductById(pid) {
  const products = await readProducts();
  return products.find((p) => String(p.id) === String(pid)) ?? null;
}

export async function addProduct(data) {
  const products = await readProducts();

  // id autogenerado para no repetir
  const nextId = (products.at(-1)?.id ?? 0) + 1;

  const newProduct = {
    id: nextId,
    title: data.title,
    description: data.description,
    code: data.code,
    price: Number(data.price),
    status: data.status ?? true,
    stock: Number(data.stock),
    category: data.category,
    thumbnails: Array.isArray(data.thumbnails) ? data.thumbnails : []
  };

  products.push(newProduct);
  await writeProducts(products);
  return newProduct;
}

export async function updateProduct(pid, updates) {
  const products = await readProducts();
  const idx = products.findIndex((p) => String(p.id) === String(pid));
  if (idx === -1) return null;

  // No actualizar ni eliminar el id
  const { id, ...rest } = updates;
  const updated = { ...products[idx], ...rest };

  products[idx] = updated;
  await writeProducts(products);
  return updated;
}

export async function deleteProduct(pid) {
  const products = await readProducts();
  const idx = products.findIndex((p) => String(p.id) === String(pid));
  if (idx === -1) return false;

  products.splice(idx, 1);
  await writeProducts(products);
  return true;
}

