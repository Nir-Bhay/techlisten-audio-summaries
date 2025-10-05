'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Generate Your Portfolio
            <span className="block text-accent">in Chat</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Create a stunning professional portfolio in minutes using AI. 
            Just chat with our AI assistant and watch your portfolio come to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              variant="accent"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Start AI Chat
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
            >
              View Templates
            </Button>
          </div>
        </div>
        
        {/* Demo Preview */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">AI</span>
                </div>
                <p className="text-lg font-medium">Live Portfolio Preview</p>
                <p className="text-sm">Your portfolio will appear here as you chat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
