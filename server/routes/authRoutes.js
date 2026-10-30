import express from 'express';
import { signup, login, getProfile, updateProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

export default router;
