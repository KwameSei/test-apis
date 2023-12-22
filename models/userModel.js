// import poolConnect from "../database/db.js";
import knexConnection from "../database/mysql_connect.js";

// creating user model
class User {
  // Create user
  static async createUser(name, email, password, role) {
    try {
      const userId = await knexConnection('users').insert({
        name,
        email,
        password,
        role_id: role
      });
      return userId;
    } catch (error) {
      throw error;
    }
  }

  // Get user by email
  static async getUserByEmail(email) {
    try {
      const user = await knexConnection('users').where({ email }).first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get user by id
  static async getUserById(id) {
    try {
      const user = await knexConnection('users').where({ id }).first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  static async getAllUsers() {
    try {
      const users = await knexConnection('users');
      return users;
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async updateUser(id, name, email, password, role) {
    try {
      const user = await knexConnection('users').where({ id }).update({
        name,
        email,
        password,
        role
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  static async deleteUser(id) {
    try {
      const user = await knexConnection('users').where({ id }).del();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default User;