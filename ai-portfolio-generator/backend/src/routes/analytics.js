const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// GET /api/analytics/:portfolioId
router.get('/:portfolioId', analyticsController.getAnalytics);

// POST /api/analytics/track
router.post('/track', analyticsController.trackEvent);

module.exports = router;
