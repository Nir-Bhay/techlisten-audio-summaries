'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '@/store/slices/uiSlice';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';

export const LandingPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleGetStarted = () => {
    dispatch(setCurrentPage('chat'));
  };

  return (
    <div>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
    </div>
  );
};
