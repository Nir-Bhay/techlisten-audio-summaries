'use client';

import React from 'react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Generation',
      description: 'Our advanced AI creates personalized content based on your profession, skills, and experience.',
    },
    {
      icon: '💬',
      title: 'Conversational Interface',
      description: 'Simply chat with our AI assistant - no complex forms or confusing interfaces.',
    },
    {
      icon: '👀',
      title: 'Live Preview',
      description: 'Watch your portfolio come to life in real-time as you chat with the AI.',
    },
    {
      icon: '🎨',
      title: 'Professional Templates',
      description: 'Choose from beautifully designed templates tailored to your industry.',
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Your portfolio looks perfect on all devices - desktop, tablet, and mobile.',
    },
    {
      icon: '🚀',
      title: 'Instant Publishing',
      description: 'Publish your portfolio with a single click and get a shareable link immediately.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose AI Portfolio Generator?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create professional portfolios faster than ever with our innovative AI-powered platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
