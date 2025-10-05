'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCurrentPage } from '@/store/slices/uiSlice';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: RootState) => state.ui);

  const handleLogoClick = () => {
    dispatch(setCurrentPage('landing'));
  };

  const handleGetStarted = () => {
    dispatch(setCurrentPage('chat'));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
            >
              AI Portfolio
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => dispatch(setCurrentPage('landing'))}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'landing' ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => dispatch(setCurrentPage('templates'))}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'templates' ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => dispatch(setCurrentPage('dashboard'))}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'dashboard' ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button onClick={handleGetStarted} variant="accent">
              Generate Portfolio
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
