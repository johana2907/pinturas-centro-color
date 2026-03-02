
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";

import { connectDB } from "./config/db.js";
import { initPassport } from "./config/passport.js";

import sessionsRouter from "./routes/sessions.routes.js";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

//  ENTREGA 1: USERS + AUTH (bcrypt + passport + JWT) 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// DB
await connectDB(process.env.MONGO_URL);

// Passport
initPassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = Number(process.env.PORT ?? 8080);
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));