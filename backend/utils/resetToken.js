import jwt from "jsonwebtoken";

export function generateResetToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, type: "password_reset" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}