import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import { UserCurrentDTO } from "../dto/userCurrent.dto.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { sendPasswordResetEmail } from "../utils/mailer.js";
import { generateResetToken } from "../utils/resetToken.js";
import { createHash, isValidPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";


const router = Router();
const usersRepository = new UsersRepository();

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

// GET /api/sessions/current  .... requerido tambien se volvio a cambiar el current
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    const safeUser = new UserCurrentDTO(req.user);
    res.json({ ok: true, user: safeUser });
  }
);

//forgot-password
router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
    }

    const token = generateResetToken(user);
    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

    await sendPasswordResetEmail(user.email, resetLink);

    res.json({ ok: true, message: "Correo de recuperación enviado" });
  } catch (err) {
    next(err);
  }
});

// reset-password
router.post("/reset-password", async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.type !== "password_reset") {
      return res.status(400).json({ ok: false, error: "Token inválido" });
    }

    const user = await usersRepository.getUserById(payload.sub);
    if (!user) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
    }

    const samePassword = isValidPassword(newPassword, user.password);
    if (samePassword) {
      return res.status(400).json({
        ok: false,
        error: "La nueva contraseña no puede ser igual a la anterior"
      });
    }

    const hashedPassword = createHash(newPassword);
    await usersRepository.updateUserPassword(user._id, hashedPassword);

    res.json({ ok: true, message: "Contraseña actualizada correctamente" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ ok: false, error: "El enlace expiró" });
    }

    return res.status(400).json({ ok: false, error: "Token inválido" });
  }
});



export default router;