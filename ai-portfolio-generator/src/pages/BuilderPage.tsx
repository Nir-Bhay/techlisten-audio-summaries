'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { PortfolioPreview } from '@/components/portfolio/PortfolioPreview';

export const BuilderPage: React.FC = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Portfolio Builder
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Sections</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                + Add Hero Section
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                + Add About Section
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                + Add Projects Section
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                + Add Contact Section
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Actions</h3>
            <div className="space-y-2">
              <Button variant="primary" size="sm" className="w-full">
                Regenerate Content
              </Button>
              <Button variant="accent" size="sm" className="w-full">
                Publish Portfolio
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Download PDF
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Settings</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                SEO Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Custom Domain
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <PortfolioPreview />
      </div>
    </div>
  );
};
