import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createAnalysis, getAnalysisById, listUserAnalyses, getAnalysisSummary } from '../controllers/analysisController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Analysis routes ready.' });
});

router.get('/mine', listUserAnalyses);
router.get('/summary', getAnalysisSummary);
router.post('/', createAnalysis);
router.get('/:id', getAnalysisById);

export default router;
