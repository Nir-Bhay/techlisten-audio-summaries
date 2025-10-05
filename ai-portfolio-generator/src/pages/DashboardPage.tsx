'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Views', value: '1,234', change: '+12%' },
    { label: 'Unique Visitors', value: '856', change: '+8%' },
    { label: 'Average Time', value: '2m 34s', change: '+15%' },
    { label: 'Bounce Rate', value: '34%', change: '-5%' },
  ];

  const recentActivity = [
    { action: 'Portfolio published', time: '2 hours ago', status: 'success' },
    { action: 'SEO settings updated', time: '1 day ago', status: 'info' },
    { action: 'New section added', time: '2 days ago', status: 'success' },
    { action: 'Template changed', time: '3 days ago', status: 'info' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your portfolio performance and get AI-powered insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <p className="text-xs text-gray-500">vs last month</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Add a skills section</p>
                    <p className="text-xs text-blue-700">Your portfolio could benefit from showcasing your technical skills</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Optimize for mobile</p>
                    <p className="text-xs text-green-700">Your portfolio looks great on desktop but could be improved for mobile users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
