// import poolConnect from "../database/db.js";
import knexConnection from "../database/mysql_connect";

// creating user model
class User {
  // Create user
  static async createUser(name, email, password, role) {
    try {
      const userId = await knexConnection('users').insert({
        name,
        email,
        password,
        role
      });
      return userId;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get user by email
  static async getUserByEmail(email) {
    try {
      const user = await knexConnection('users').where({ email }).first();
      return user;
    } catch (error) {
      throw new error(error);
    }
  }
}

export default User;