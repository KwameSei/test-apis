import express from 'express';
import { authentication, authorization } from '../middleware/auth.js';
import userController from '../controllers/userController.js';

const router = express.Router();

// Routes
// Public routes (no authentication required)
// router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes (authentication required)
// router.get('/users', authentication, userController.getAllUsers);

// Admin routes (authentication and authorization required)
router.post('/register', authentication, authorization, userController.registerUser);

export default router;