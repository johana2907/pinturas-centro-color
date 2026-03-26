import { UsersDAO } from "../dao/mongo/users.dao.js";

export class UsersRepository {
  constructor() {
    this.dao = new UsersDAO();
  }

  async getUserById(id) {
    return await this.dao.getById(id);
  }

  async getUserByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  async createUser(userData) {
    return await this.dao.create(userData);
  }

  async updateUserPassword(id, newPassword) {
    return await this.dao.updatePassword(id, newPassword);
  }

}