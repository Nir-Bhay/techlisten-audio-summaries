import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PortfolioData {
  name: string
  role: string
  bio: string
  skills: string[]
  projects: Array<{
    title: string
    description: string
    technologies: string[]
    link?: string
  }>
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    year: string
  }>
  contact: {
    email: string
    phone?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

interface PortfolioState {
  data: Partial<PortfolioData>
  selectedTemplate: string | null
  htmlPreview: string
  publishedUrl: string | null
  seoSettings: {
    title: string
    description: string
    keywords: string[]
  }
}

const initialState: PortfolioState = {
  data: {},
  selectedTemplate: null,
  htmlPreview: '',
  publishedUrl: null,
  seoSettings: {
    title: '',
    description: '',
    keywords: [],
  },
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolioData: (state, action: PayloadAction<Partial<PortfolioData>>) => {
      state.data = { ...state.data, ...action.payload }
    },
    setSelectedTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload
    },
    setHtmlPreview: (state, action: PayloadAction<string>) => {
      state.htmlPreview = action.payload
    },
    setPublishedUrl: (state, action: PayloadAction<string>) => {
      state.publishedUrl = action.payload
    },
    updateSeoSettings: (state, action: PayloadAction<Partial<typeof initialState.seoSettings>>) => {
      state.seoSettings = { ...state.seoSettings, ...action.payload }
    },
  },
})

export const {
  updatePortfolioData,
  setSelectedTemplate,
  setHtmlPreview,
  setPublishedUrl,
  updateSeoSettings,
} = portfolioSlice.actions
export default portfolioSlice.reducer
