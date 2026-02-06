import { Router } from "express";
import { createCart, getCartById, addProductToCart } from "../services/carts.service.js";

const router = Router();

// POST /api/carts  -> cree carrito
router.post("/", async (req, res, next) => {
  try {
    const cart = await createCart();
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
});

// GET /api/carts/:cid -> traje un carrito por id

router.get("/:cid", async (req, res, next) => {
  try {
    const cart = await getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// POST /api/carts/:cid/product/:pid -> agregue  producto
router.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    const result = await addProductToCart(req.params.cid, req.params.pid);

    if (result?.error === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    if (result?.error === "CART_NOT_FOUND") {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
