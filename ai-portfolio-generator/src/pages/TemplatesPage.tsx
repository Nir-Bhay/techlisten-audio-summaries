'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export const TemplatesPage: React.FC = () => {
  const templates = [
    {
      id: '1',
      name: 'Modern Professional',
      description: 'Clean and modern design perfect for developers and designers',
      thumbnail: '/api/placeholder/300/200',
      category: 'Professional',
    },
    {
      id: '2',
      name: 'Creative Portfolio',
      description: 'Bold and creative layout for artists and creative professionals',
      thumbnail: '/api/placeholder/300/200',
      category: 'Creative',
    },
    {
      id: '3',
      name: 'Minimalist',
      description: 'Simple and elegant design focusing on content',
      thumbnail: '/api/placeholder/300/200',
      category: 'Minimalist',
    },
    {
      id: '4',
      name: 'Corporate',
      description: 'Professional corporate style for business executives',
      thumbnail: '/api/placeholder/300/200',
      category: 'Corporate',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Template
        </h1>
        <p className="text-xl text-gray-600">
          Select a template that matches your style and profession
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className="w-full h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {template.name}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {template.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {template.description}
              </p>
              <Button className="w-full" variant="primary">
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
