'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LandingPage } from '@/pages/LandingPage';
import { ChatPage } from '@/pages/ChatPage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { BuilderPage } from '@/pages/BuilderPage';
import { DashboardPage } from '@/pages/DashboardPage';

export const App: React.FC = () => {
  const { currentPage } = useSelector((state: RootState) => state.ui);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'chat':
        return <ChatPage />;
      case 'templates':
        return <TemplatesPage />;
      case 'builder':
        return <BuilderPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};
