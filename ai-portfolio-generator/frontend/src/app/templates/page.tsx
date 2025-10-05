'use client'

import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import TemplateCarousel from '@/components/TemplateCarousel'
import { motion } from 'framer-motion'

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/chat" className="flex items-center text-gray-700 hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chat
            </Link>
            <div className="flex items-center">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="ml-2 text-xl font-bold text-accent">AI Portfolio</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Template
            </h1>
            <p className="text-xl text-gray-600">
              Select a template that best represents your professional style
            </p>
          </div>

          <TemplateCarousel />

          <div className="mt-12 text-center">
            <Link href="/builder" className="btn-primary text-lg px-8 py-4 inline-block">
              Continue to Builder
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
