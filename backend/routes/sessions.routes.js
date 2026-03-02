import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// POST /api/sessions/register
router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  (req, res) => {
    res.status(201).json({ ok: true, message: "Usuario creado", user: req.user });
  }
);

// POST /api/sessions/login
router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.json({ ok: true, token });
  }
);

// GET /api/sessions/current  .... requerido
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    const u = req.user;
    res.json({
      ok: true,
      user: {
        id: u._id,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        age: u.age,
        role: u.role,
        cart: u.cart
      }
    });
  }
);

export default router;