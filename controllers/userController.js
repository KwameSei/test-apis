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
      console.error('Request body', req.body);

      const { name, email, password, role } = req.body;
    
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

      console.error('User input validated', JSON.stringify(req.body, null, 2));

      // Convert email to lower case
      const emailToLower = email.toLowerCase();

      // Check if user exists
      const userExists = await User.getUserByEmail(emailToLower);
      if (userExists) {
        return res.status(409).json({
          status: 'error',
          error: 'User already exists'
        });
      }

      console.error('User exists: ', userExists);

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const userId = await User.createUser(name, email, hashedPassword, role);

      console.error(userId);
      
      // Create token
      const newToken = jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return res.status(201).json({
        status: 'success',
        data: {
          token: newToken,
          user: {
            id: userId,
            name,
            email: emailToLower,
            role
          }
        }
      });
    } catch (error) {
      console.error('Error registering user: ', error);
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
          error: 'Invalid password'
        });
      }

      // Create token
      const newToken = jsonwebtoken.sign({ id: user, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return res.status(200).json({
        status: 'success',
        data: {
          token: newToken,
          user: {
            id: user,
            name: user.name,
            email: emailToLower,
            role: user.role
          }
        },
        message: 'User logged in successfully'
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