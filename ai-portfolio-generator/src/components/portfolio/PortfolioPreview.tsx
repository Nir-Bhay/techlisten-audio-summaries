'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const PortfolioPreview: React.FC = () => {
  const { htmlContent, cssContent, isGenerating } = useSelector((state: RootState) => state.portfolio);

  return (
    <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Preview Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="h-full overflow-auto">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <span className="text-white text-2xl">AI</span>
              </div>
              <p className="text-lg font-medium text-gray-600">Generating your portfolio...</p>
              <p className="text-sm text-gray-500">This will take just a moment</p>
            </div>
          </div>
        ) : htmlContent ? (
          <div className="h-full">
            <style dangerouslySetInnerHTML={{ __html: cssContent }} />
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">👁️</span>
              </div>
              <p className="text-lg font-medium">Your portfolio will appear here</p>
              <p className="text-sm">Start chatting to generate your portfolio</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
