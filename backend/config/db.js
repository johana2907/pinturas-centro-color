import mongoose from "mongoose";

export async function connectDB(mongoUrl) {
  await mongoose.connect(mongoUrl);
  console.log("MongoDB conectado");
}