'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSeoSettings, setPublishedUrl } from '@/store/portfolioSlice'
import { RootState } from '@/store/store'
import { ArrowLeft, Sparkles, Globe, Link as LinkIcon, Save } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { seoSettings, publishedUrl } = useSelector((state: RootState) => state.portfolio)
  const [customDomain, setCustomDomain] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: seoSettings.title,
    description: seoSettings.description,
    keywords: seoSettings.keywords.join(', '),
  })

  const handleSave = () => {
    dispatch(updateSeoSettings({
      title: formData.title,
      description: formData.description,
      keywords: formData.keywords.split(',').map(k => k.trim()),
    }))
    alert('Settings saved successfully!')
  }

  const handlePublish = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customDomain }),
      })
      const data = await response.json()
      dispatch(setPublishedUrl(data.url))
      alert('Portfolio published successfully!')
    } catch (error) {
      console.error('Error publishing:', error)
      alert('Error publishing portfolio')
    } finally {
      setLoading(false)
    }
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
              <span className="ml-2 text-xl font-bold text-accent">Settings & SEO</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* SEO Settings */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-accent" />
              SEO Optimization
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., John Doe - Full Stack Developer"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your professional profile in 150-160 characters"
                  className="input-field h-24 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 150-160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="web developer, react, nodejs, javascript"
                  className="input-field"
                />
              </div>

              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save SEO Settings
              </button>
            </div>
          </div>

          {/* Publishing */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-accent" />
              Publish Portfolio
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Domain/Path
                </label>
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">
                    ai-portfolio.app/
                  </span>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="yourname"
                    className="input-field flex-1"
                  />
                </div>
              </div>

              {publishedUrl && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2">
                    Your portfolio is live!
                  </p>
                  <a
                    href={publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {publishedUrl}
                  </a>
                </div>
              )}

              <button
                onClick={handlePublish}
                disabled={loading || !customDomain}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Portfolio'}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="btn-secondary flex-1 text-center">
              View Analytics Dashboard
            </Link>
            <Link href="/builder" className="btn-primary flex-1 text-center">
              Back to Builder
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
