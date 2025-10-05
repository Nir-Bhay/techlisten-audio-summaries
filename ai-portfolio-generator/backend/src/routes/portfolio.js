const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// POST /api/portfolio/render
router.post('/render', portfolioController.renderPortfolio);

// POST /api/portfolio/publish
router.post('/publish', portfolioController.publishPortfolio);

// GET /api/portfolio/:id
router.get('/:id', portfolioController.getPortfolio);

// PUT /api/portfolio/:id
router.put('/:id', portfolioController.updatePortfolio);

// DELETE /api/portfolio/:id
router.delete('/:id', portfolioController.deletePortfolio);

module.exports = router;
