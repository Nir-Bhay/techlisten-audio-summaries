'use client';

import React from 'react';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { PortfolioPreview } from '@/components/portfolio/PortfolioPreview';

export const ChatPage: React.FC = () => {
  return (
    <div className="h-screen flex">
      {/* Chat Section */}
      <div className="w-1/2 border-r border-gray-200">
        <ChatWindow />
      </div>
      
      {/* Preview Section */}
      <div className="w-1/2 p-6">
        <PortfolioPreview />
      </div>
    </div>
  );
};
