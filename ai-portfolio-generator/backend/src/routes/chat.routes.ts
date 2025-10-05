import express from 'express';
import { respondToMessage, createChatSession } from '../controllers/chat.controller';

const router = express.Router();

router.post('/respond', respondToMessage);
router.post('/session', createChatSession);

export default router;
