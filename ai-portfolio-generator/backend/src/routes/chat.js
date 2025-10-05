const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat/respond
router.post('/respond', chatController.respondToMessage);

// GET /api/chat/history/:userId
router.get('/history/:userId', chatController.getChatHistory);

// POST /api/chat/clear/:userId
router.post('/clear/:userId', chatController.clearChatHistory);

module.exports = router;
