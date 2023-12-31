import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

// Create user authentication middleware
export const authentication = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Unauthorized! Please provide a token'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id
    const user = await User.getUserById(decoded.id.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: 'error',
        error: 'User not found or missing role information'
      });
    }

    // Set user to req.user
    req.user = user;

    // Call next middleware
    next();

  } catch (error) {
    return res.status(401).json({
      status: 'error',
      success: false,
      message: 'Unauthorized! Please provide a valid token',
      error: 'Unauthorized! Please provide a valid token'
    });
  }
};

// Create user authorization middleware
export const authorization = (roles) => {
  return (req, res, next) => {

    // Check if user role matches any of the required roles
    if (!roles.includes(req.user.role_id)) {
      return res.status(403).json({
        status: 'error',
        error: 'You are not authorized to access this resource'
      });
    }

    // Call next middleware
    next();
  };
};
