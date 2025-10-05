const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

// GET /api/templates
router.get('/', templateController.getTemplates);

// GET /api/templates/:id
router.get('/:id', templateController.getTemplate);

// POST /api/templates
router.post('/', templateController.createTemplate);

module.exports = router;
