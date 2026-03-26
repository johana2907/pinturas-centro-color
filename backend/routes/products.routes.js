
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../services/products.service.js";

const router = Router();

// GET /api/products/
router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /
router.post(
  "/",
  passport.authenticate("current", { session: false }),
  authorization("admin"),
  async (req, res, next) => {
    try {
      const { title, description, code, price, stock, category } = req.body;

      if (!title || !description || !code || price == null || stock == null || !category) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const created = await addProduct(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
);

// PUT/:pid
router.put(
  "/:pid",
  passport.authenticate("current", { session: false }),
  authorization("admin"),
  async (req, res, next) => {
    try {
      const updated = await updateProduct(req.params.pid, req.body);
      if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);
// DELETE /:pid
router.delete(
  "/:pid",
  passport.authenticate("current", { session: false }),
  authorization("admin"),
  async (req, res, next) => {
    try {
      const ok = await deleteProduct(req.params.pid);
      if (!ok) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);
export default router;
