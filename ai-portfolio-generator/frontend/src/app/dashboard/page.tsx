'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Sparkles, Eye, Clock, TrendingUp, MapPin, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState({
    totalViews: 1234,
    avgTimeOnPage: '2:34',
    topSections: [
      { name: 'Projects', views: 450 },
      { name: 'About', views: 380 },
      { name: 'Skills', views: 290 },
      { name: 'Experience', views: 114 },
    ],
    viewsByDay: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [120, 150, 180, 220, 190, 160, 214],
    },
    topLocations: [
      { country: 'United States', views: 456 },
      { country: 'United Kingdom', views: 234 },
      { country: 'Canada', views: 189 },
      { country: 'Germany', views: 145 },
    ],
  })

  const [aiSuggestions] = useState([
    'Add more project details to increase engagement',
    'Your skills section has low views - consider reorganizing it',
    'Portfolio performs best on Thursdays - schedule updates accordingly',
    'Consider adding testimonials to boost credibility',
  ])

  const lineChartData = {
    labels: analytics.viewsByDay.labels,
    datasets: [
      {
        label: 'Views',
        data: analytics.viewsByDay.data,
        borderColor: '#1E3A8A',
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const barChartData = {
    labels: analytics.topSections.map(s => s.name),
    datasets: [
      {
        label: 'Section Views',
        data: analytics.topSections.map(s => s.views),
        backgroundColor: '#F59E0B',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/builder" className="flex items-center text-gray-700 hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Builder
            </Link>
            <div className="flex items-center">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="ml-2 text-xl font-bold text-accent">Analytics Dashboard</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-accent">{analytics.totalViews}</p>
                </div>
                <Eye className="w-12 h-12 text-accent opacity-20" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Time on Page</p>
                  <p className="text-3xl font-bold text-accent">{analytics.avgTimeOnPage}</p>
                </div>
                <Clock className="w-12 h-12 text-accent opacity-20" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
                  <p className="text-3xl font-bold text-green-600">+23%</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Views Over Time</h3>
              <div className="h-64">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Section Heatmap</h3>
              <div className="h-64">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Top Locations */}
          <div className="card mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Top Locations
            </h3>
            <div className="space-y-3">
              {analytics.topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{location.country}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${(location.views / analytics.totalViews) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{location.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-cta" />
              AI-Powered Suggestions
            </h3>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
