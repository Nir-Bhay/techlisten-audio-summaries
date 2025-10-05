'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedTemplate } from '@/store/portfolioSlice'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  bestFor: string[]
}

const templates: Template[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and minimalistic design perfect for developers',
    thumbnail: '/templates/modern-minimal.jpg',
    bestFor: ['Developers', 'Engineers', 'Tech Professionals'],
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Vibrant and eye-catching for creative professionals',
    thumbnail: '/templates/creative-bold.jpg',
    bestFor: ['Designers', 'Artists', 'Creatives'],
  },
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    description: 'Traditional and elegant for business professionals',
    thumbnail: '/templates/professional-classic.jpg',
    bestFor: ['Business', 'Consultants', 'Executives'],
  },
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    description: 'Modern tech-inspired design with animations',
    thumbnail: '/templates/tech-futuristic.jpg',
    bestFor: ['Data Scientists', 'AI Engineers', 'Tech Leaders'],
  },
  {
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    description: 'Image-heavy layout for visual portfolios',
    thumbnail: '/templates/portfolio-showcase.jpg',
    bestFor: ['Photographers', 'Graphic Designers', 'Illustrators'],
  },
]

export default function TemplateCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const dispatch = useDispatch()

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : templates.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < templates.length - 1 ? prev + 1 : 0))
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    dispatch(setSelectedTemplate(id))
  }

  return (
    <div className="w-full">
      <div className="relative">
        {/* Main Template Display */}
        <div className="overflow-hidden">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <p className="text-lg font-semibold">{templates[currentIndex].name}</p>
                <p className="text-sm">Template Preview</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">{templates[currentIndex].name}</h3>
            <p className="text-gray-600 mb-4">{templates[currentIndex].description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {templates[currentIndex].bestFor.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleSelect(templates[currentIndex].id)}
              className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                selectedId === templates[currentIndex].id
                  ? 'bg-green-500 text-white'
                  : 'btn-primary'
              }`}
            >
              {selectedId === templates[currentIndex].id && <Check className="w-5 h-5" />}
              {selectedId === templates[currentIndex].id ? 'Selected' : 'Select This Template'}
            </button>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {templates.map((template, index) => (
          <button
            key={template.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-accent w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
