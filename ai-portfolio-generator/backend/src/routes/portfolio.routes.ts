import express from 'express';
import {
  renderPortfolio,
  savePortfolio,
  publishPortfolio,
  getPortfolios,
  getPortfolioById,
} from '../controllers/portfolio.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/render', renderPortfolio);
router.post('/save', authenticate, savePortfolio);
router.post('/publish', authenticate, publishPortfolio);
router.get('/', authenticate, getPortfolios);
router.get('/:id', getPortfolioById);

export default router;
