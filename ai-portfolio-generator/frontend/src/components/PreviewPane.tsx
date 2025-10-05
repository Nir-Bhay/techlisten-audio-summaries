'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { motion } from 'framer-motion'
import { Eye, Code, Download } from 'lucide-react'
import { useState } from 'react'

export default function PreviewPane() {
  const { htmlPreview, data } = useSelector((state: RootState) => state.portfolio)
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log('Downloading PDF...')
  }

  const handleDownloadHTML = () => {
    const blob = new Blob([htmlPreview], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === 'preview' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === 'code' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Code className="w-4 h-4" />
            Code
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3 py-2 rounded-lg flex items-center gap-2 bg-cta text-white hover:bg-amber-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === 'preview' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            {htmlPreview ? (
              <iframe
                srcDoc={htmlPreview}
                className="w-full h-full border-0"
                title="Portfolio Preview"
                sandbox="allow-same-origin"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Eye className="w-16 h-16 mb-4" />
                <p className="text-lg">No preview available yet</p>
                <p className="text-sm">Start chatting to generate your portfolio</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            {htmlPreview ? (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto h-full">
                <pre>{htmlPreview}</pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Code className="w-16 h-16 mb-4" />
                <p className="text-lg">No code generated yet</p>
                <p className="text-sm">Start chatting to generate your portfolio</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Quick Info */}
      {data.name && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <strong>Name:</strong> {data.name}
            </span>
            {data.role && (
              <span className="text-gray-600">
                <strong>Role:</strong> {data.role}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
