import express from 'express';
import { getAnalytics } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/:portfolioId', authenticate, getAnalytics);

export default router;
