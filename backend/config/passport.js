import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { UserModel } from "../models/user.model.js";
import { CartModel } from "../models/cart.model.js";
import { createHash, isValidPassword } from "../utils/password.js";

export function initPassport() {
                               // Registro (local)
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true, session: false },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          const exists = await UserModel.findOne({ email });
          if (exists) return done(null, false, { message: "Email ya registrado" });

          const cart = await CartModel.create({ products: [] });

          const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: cart._id,
            role: "user"
          });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // LOGIN (local)
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", session: false },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) return done(null, false, { message: "Usuario no encontrado" });

          if (!isValidPassword(password, user.password)) {
            return done(null, false, { message: "Password incorrecto" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // CURRENT (jwt)
  passport.use(
    "current",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        try {
          const user = await UserModel.findById(payload.sub).populate("cart");
          if (!user) return done(null, false);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}