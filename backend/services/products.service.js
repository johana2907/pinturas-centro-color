import { readFile } from "node:fs/promises";

const fileUrl = new URL("../data/products.json", import.meta.url);

// ASÍNCRONO: leer archivo con await (I/O)
export async function getProducts() {
  const raw = await readFile(fileUrl, "utf-8");
  const products = JSON.parse(raw);

  // SINCRÓNICO: transformar data (ES9 spread)
  return products.map((p) => ({
    ...p,
    currency: "COP"
  }));
}
