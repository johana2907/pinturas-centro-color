import { Router } from "express";
import { getProducts } from "../services/products.service.js";

const router = Router();

// ASYNC/AWAIT: asincronía real
router.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();

    // ES11: optional chaining + nullish coalescing
    const q = (req.query?.q ?? "").toLowerCase();

    const filtered = q
      ? products.filter((p) => p.name.toLowerCase().includes(q))
      : products;

    res.json({ ok: true, total: filtered.length, data: filtered });
  } catch (err) {
    next(err);
  }
});

export default router;
