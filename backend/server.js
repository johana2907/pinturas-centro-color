
import express from "express";
import cors from "cors";

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend funcionando ✅" });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// middleware de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Error interno" });
});

const PORT = 8080; //  requerido
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});




