import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

// Create user controller
class UserController {
  // Register user
  static async registerUser(req, res) {
    try {
      const { name, email, password, role } = req.body;

      console.log(req.body);
    
      // Validate user input
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'User email, password and name are required'
        })
      }

      // Check password length
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Password must be at least 6 characters long'
        })
      }

      // Convert email to lower case
      const emailToLower = email.toLowerCase();

      // Check if user exists
      const userExists = await User.getUserByEmail({email: emailToLower});
      if (userExists) {
        return res.status(409).json({
          status: 'error',
          error: 'User already exists'
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const userId = await User.createUser(name, email, hashedPassword, role);
      
      // Create token
      const token = jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return res.status(201).json({
        status: 'success',
        data: {
          token,
          user: {
            id: userId,
            name,
            email: emailToLower,
            role
          }
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  }

  // Login user
  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      // Validate user input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'User email and password are required'
        });
      }

      // Convert email to lower case
      const emailToLower = email.toLowerCase();

      // Check if user exists
      const user = await User.getUserByEmail(emailToLower);
      if (!user) {
        return res.status(401).json({
          status: 'error',
          error: 'Invalid email or password'
        });
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          status: 'error',
          error: 'Invalid email or password'
        });
      }

      // Create token
      const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: emailToLower,
            role: user.role
          }
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  }
}

export default UserController;