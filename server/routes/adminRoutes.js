import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAdminOverview,
  listCategories,
  createCategory,
  toggleCategory,
  listLegalRules,
  createLegalRule,
  deleteLegalRule,
  listResources,
  createResource,
  deleteResource,
} from '../controllers/adminController.js';
import { listSchemes, saveScheme } from '../controllers/schemeController.js';

const router = express.Router();

// Allow public read or authenticated access, token verification on mutation
router.get('/overview', getAdminOverview);

// Categories
router.get('/categories', listCategories);
router.post('/categories', verifyToken, createCategory);
router.patch('/categories/:id/toggle', verifyToken, toggleCategory);

// Schemes (Reuse schemeController)
router.get('/schemes', listSchemes);
router.post('/schemes', verifyToken, saveScheme);

// Legal Rules
router.get('/legal-rules', listLegalRules);
router.post('/legal-rules', verifyToken, createLegalRule);
router.delete('/legal-rules/:id', verifyToken, deleteLegalRule);

// Resources & Content
router.get('/resources', listResources);
router.post('/resources', verifyToken, createResource);
router.delete('/resources/:id', verifyToken, deleteResource);

export default router;
