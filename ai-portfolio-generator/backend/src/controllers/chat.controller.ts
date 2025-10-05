import { Request, Response } from 'express';
import OpenAI from 'openai';
import ChatSession from '../models/ChatSession.model';
import Portfolio from '../models/Portfolio.model';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI portfolio assistant. Your job is to help users create professional portfolios by gathering information through conversation.

Follow these steps:
1. Ask for their name
2. Ask about their professional role/title
3. Ask about their key skills (programming languages, tools, etc.)
4. Ask about their notable projects (2-3 projects with descriptions)
5. Ask about their work experience
6. Ask about their education
7. Ask for contact information (email, LinkedIn, GitHub)

Be conversational, friendly, and helpful. Extract structured data from user responses.
When you receive information, acknowledge it and move to the next question naturally.
`;

export const respondToMessage = async (req: Request, res: Response) => {
  try {
    const { message, messages = [], sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Build conversation history
    const conversationHistory = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ];

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content || 'I apologize, I encountered an error. Please try again.';

    // Extract structured data using GPT
    const extractionPrompt = `Extract structured portfolio data from this conversation. Return JSON with fields: name, role, bio, skills (array), projects (array of objects with title, description, technologies), experience (array), education (array), contact (object with email, linkedin, github).

Conversation:
${messages.map((m: any) => `${m.role}: ${m.content}`).join('\n')}
${message}

Return only valid JSON, no other text.`;

    const extractionCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: extractionPrompt }],
      temperature: 0.3,
    });

    let extractedData = {};
    try {
      const extractedText = extractionCompletion.choices[0].message.content || '{}';
      extractedData = JSON.parse(extractedText);
    } catch (e) {
      console.error('Failed to parse extracted data:', e);
    }

    // Save or update chat session
    if (sessionId) {
      await ChatSession.findByIdAndUpdate(sessionId, {
        $push: {
          messages: [
            { role: 'user', content: message },
            { role: 'ai', content: aiResponse },
          ],
        },
        extractedData,
      });
    }

    res.json({
      success: true,
      response: aiResponse,
      extractedData,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      details: error.message,
    });
  }
};

export const createChatSession = async (req: Request, res: Response) => {
  try {
    const session = await ChatSession.create({
      userId: req.userId,
      messages: [],
    });

    res.json({
      success: true,
      sessionId: session._id,
    });
  } catch (error: any) {
    console.error('Create session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create chat session',
    });
  }
};
