import bcrypt from "bcrypt";

export function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}