'use client'

import { useState } from 'react'
import { ArrowLeft, Sparkles, RefreshCw, Plus, Settings as SettingsIcon, Upload } from 'lucide-react'
import Link from 'next/link'
import ChatWindow from '@/components/ChatWindow'
import PreviewPane from '@/components/PreviewPane'
import { motion } from 'framer-motion'

export default function BuilderPage() {
  const [splitView, setSplitView] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/chat" className="flex items-center text-gray-700 hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chat
            </Link>
            <div className="flex items-center">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="ml-2 text-xl font-bold text-accent">Portfolio Builder</span>
            </div>
            <Link href="/settings" className="btn-secondary flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Regenerate Section
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Add Section
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSplitView(!splitView)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {splitView ? 'Full Preview' : 'Split View'}
              </button>
              <Link href="/settings" className="btn-primary flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Publish
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Builder Content */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`h-full ${splitView ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1'} p-4`}
        >
          {/* Chat Section */}
          {splitView && (
            <div className="h-full">
              <ChatWindow />
            </div>
          )}

          {/* Preview Section */}
          <div className="h-full">
            <PreviewPane />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
