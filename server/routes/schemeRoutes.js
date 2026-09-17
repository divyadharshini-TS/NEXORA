import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { listSchemes, saveScheme, listSavedSchemesForUser } from '../controllers/schemeController.js';

const router = express.Router();

router.get('/', listSchemes);
router.get('/saved', verifyToken, listSavedSchemesForUser);
router.post('/save', verifyToken, saveScheme);

export default router;
