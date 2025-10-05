'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Zap, Eye, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI-Powered Generation',
      description: 'Let AI create a stunning portfolio tailored to your role and experience'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-Time Preview',
      description: 'See your portfolio come to life as you chat with our AI assistant'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed templates optimized for your field'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Analytics Dashboard',
      description: 'Track views and get AI-powered suggestions to improve your portfolio'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-accent" />
              <span className="ml-2 text-2xl font-bold text-accent">AI Portfolio</span>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-700 hover:text-accent transition-colors">
                Login
              </Link>
              <Link href="/chat" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Generate Your Portfolio
              <br />
              <span className="text-accent">in Chat</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Chat with our AI assistant to create a stunning, professional portfolio
              in minutes. No design skills required.
            </p>
            <Link href="/chat" className="btn-primary text-lg px-8 py-4 inline-block">
              Start Creating Now
            </Link>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="card max-w-5xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-accent to-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl">Portfolio Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose AI Portfolio Generator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-accent mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who have created stunning portfolios with AI
            </p>
            <Link href="/chat" className="btn-primary text-lg px-8 py-4 inline-block">
              Start Your Portfolio Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <Sparkles className="w-8 h-8 text-cta" />
            <span className="ml-2 text-2xl font-bold">AI Portfolio</span>
          </div>
          <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="hover:text-cta transition-colors">Terms</a>
            <a href="#" className="hover:text-cta transition-colors">Privacy</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cta transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-cta transition-colors">Contact</a>
          </div>
          <p className="text-gray-400">
            © 2025 AI Portfolio Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
