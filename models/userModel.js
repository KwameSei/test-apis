// import poolConnect from "../database/db.js";
import knexConnection from "../database/mysql_connect.js";
import * as yup from 'yup';

// creating user schema
const userValidationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(30).required(),
  role: yup.number().required()
});

// creating user model
class User {
  // Create user
  // static async createUser(name, email, password, role) {
  //   try {
  //     const userId = await knexConnection('users').insert({
  //       name,
  //       email,
  //       password,
  //       role_id: role
  //     });
  //     return userId;
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw error;
  //   }
  // }

  static async createUser(name, email, password, role) {
    try {
      const user = { name, email, password, role_id: role };
      await userValidationSchema.validate(user);
      const userId = await knexConnection('users').insert(user);
      return userId;
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message
        }));
        throw { status: 400, message: 'Validation errors', errors: validationErrors };
      }
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

  static async getUserById(id) {
    try {
      const user = await knexConnection('users').where({ id }).first();
      if (!user) {
        throw { status: 404, message: 'User not found' };
      }
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

  static async updateUser(id, name, email, password, role) {
    try {
      const user = { name, email, password, role_id: role };
      await userValidationSchema.validate(user);
      const updatedUser = await knexConnection('users').where({ id }).update(user);
      return updatedUser;
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message
        }));
        throw { status: 400, message: 'Validation errors', errors: validationErrors };
      }
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await knexConnection('users').where({ id }).del();
      if (!user) {
        throw { status: 404, message: 'User not found' };
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default User;