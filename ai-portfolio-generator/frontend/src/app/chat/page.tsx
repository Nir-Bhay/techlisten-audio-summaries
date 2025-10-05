'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setCurrentStep } from '@/store/chatSlice'
import { RootState } from '@/store/store'
import ChatWindow from '@/components/ChatWindow'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ChatPage() {
  const dispatch = useDispatch()
  const { currentStep, totalSteps, messages } = useSelector((state: RootState) => state.chat)

  useEffect(() => {
    // Initialize chat with welcome message if no messages exist
    if (messages.length === 0) {
      const welcomeMessage = {
        id: '1',
        role: 'ai' as const,
        content: "Hi! I'm your AI portfolio assistant. Let's create an amazing portfolio together! What's your name?",
        timestamp: new Date(),
      }
      dispatch(addMessage(welcomeMessage))
    }
  }, [dispatch, messages.length])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center text-gray-700 hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="ml-2 text-xl font-bold text-accent">AI Portfolio</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-[calc(100vh-250px)]">
          <ChatWindow />
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            href="/templates"
            className="btn-secondary"
          >
            View Templates
          </Link>
          <Link
            href="/builder"
            className="btn-primary"
          >
            Go to Builder
          </Link>
        </div>
      </div>
    </div>
  )
}
