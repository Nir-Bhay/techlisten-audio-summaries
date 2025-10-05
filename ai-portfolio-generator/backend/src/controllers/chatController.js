const OpenAI = require('openai');
const Chat = require('../models/Chat');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const respondToMessage = async (req, res) => {
  try {
    const { message, userId, step, userProfile } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and userId are required' });
    }

    // Generate AI response based on current step and user profile
    const aiResponse = await generateAIResponse(message, step, userProfile);

    // Save message to database
    const chatMessage = new Chat({
      userId,
      message,
      response: aiResponse,
      step,
      userProfile,
      timestamp: new Date()
    });

    await chatMessage.save();

    res.json({
      response: aiResponse,
      step: step + 1,
      completed: step >= 5
    });

  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};

const generateAIResponse = async (message, step, userProfile) => {
  const systemPrompt = `You are an AI portfolio assistant helping users create professional portfolios. 
  You are currently on step ${step} of 5. The user profile so far: ${JSON.stringify(userProfile)}.
  
  Step 1: Get user's name
  Step 2: Get their profession/role
  Step 3: Get their skills/technologies
  Step 4: Get their experience level
  Step 5: Suggest portfolio templates and move to template selection
  
  Be conversational, helpful, and guide them through the process.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback responses
    const fallbackResponses = {
      1: `Nice to meet you, ${message}! What's your profession or role?`,
      2: `Great! A ${message}. What are your main skills or technologies you work with?`,
      3: `Excellent! Can you tell me about a recent project you're proud of?`,
      4: `That sounds impressive! How many years of experience do you have in this field?`,
      5: `Perfect! I have all the information I need. Let me suggest some portfolio templates for you...`,
    };
    return fallbackResponses[step] || "I understand. Can you tell me more about that?";
  }
};

const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ userId }).sort({ timestamp: -1 });
    res.json(chats);
  } catch (error) {
    console.error('Error getting chat history:', error);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    await Chat.deleteMany({ userId });
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    res.status(500).json({ error: 'Failed to clear chat history' });
  }
};

module.exports = {
  respondToMessage,
  getChatHistory,
  clearChatHistory
};
