'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addMessage, setTyping } from '@/store/slices/chatSlice';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { ProgressIndicator } from './ProgressIndicator';

export const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, isTyping, currentStep, totalSteps, userProfile } = useSelector((state: RootState) => state.chat);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    dispatch(addMessage({
      content: message,
      sender: 'user',
      type: 'text',
    }));

    setInputValue('');
    dispatch(setTyping(true));

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, currentStep, userProfile);
      dispatch(addMessage({
        content: aiResponse,
        sender: 'ai',
        type: 'text',
      }));
      dispatch(setTyping(false));
    }, 1500);
  };

  const generateAIResponse = (userMessage: string, step: number, profile: any): string => {
    const responses = {
      1: `Nice to meet you, ${userMessage}! What's your profession or role?`,
      2: `Great! A ${userMessage}. What are your main skills or technologies you work with?`,
      3: `Excellent! Can you tell me about a recent project you're proud of?`,
      4: `That sounds impressive! How many years of experience do you have in this field?`,
      5: `Perfect! I have all the information I need. Let me suggest some portfolio templates for you...`,
    };

    return responses[step as keyof typeof responses] || "I understand. Can you tell me more about that?";
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI Portfolio Assistant</h2>
          <div className="text-sm opacity-90">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="text-sm ml-2">AI is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};
