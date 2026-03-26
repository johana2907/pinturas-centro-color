import { UserModel } from "../../models/user.model.js";

export class UsersDAO {
  async getById(id) {
    return await UserModel.findById(id).populate("cart");
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email }).populate("cart");
  }

  async create(userData) {
    return await UserModel.create(userData);
  }

  async updatePassword(id, newPassword) {
    return await UserModel.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }
    );
  }
}