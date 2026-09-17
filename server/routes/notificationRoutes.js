import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { listNotifications, createNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', verifyToken, listNotifications);
router.post('/', verifyToken, createNotification);

export default router;
