import { products } from '../data/products'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export async function getProducts(categoryId) {
  await delay(300)
  return categoryId ? products.filter(p => p.category === categoryId) : products
}

export async function getProductById(id) {
  await delay(300)
  return products.find(p => p.id === id) || null
}
