import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  html: string;
  css: string;
}

export interface PortfolioSection {
  id: string;
  type: 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact' | 'custom';
  title: string;
  content: any;
  order: number;
}

export interface PortfolioState {
  currentTemplate: PortfolioTemplate | null;
  sections: PortfolioSection[];
  htmlContent: string;
  cssContent: string;
  isGenerating: boolean;
  publishedUrl: string | null;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const initialState: PortfolioState = {
  currentTemplate: null,
  sections: [],
  htmlContent: '',
  cssContent: '',
  isGenerating: false,
  publishedUrl: null,
  seoData: {
    title: '',
    description: '',
    keywords: [],
  },
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<PortfolioTemplate>) => {
      state.currentTemplate = action.payload;
    },
    addSection: (state, action: PayloadAction<PortfolioSection>) => {
      state.sections.push(action.payload);
      state.sections.sort((a, b) => a.order - b.order);
    },
    updateSection: (state, action: PayloadAction<{ id: string; updates: Partial<PortfolioSection> }>) => {
      const index = state.sections.findIndex(section => section.id === action.payload.id);
      if (index !== -1) {
        state.sections[index] = { ...state.sections[index], ...action.payload.updates };
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(section => section.id !== action.payload);
    },
    setHtmlContent: (state, action: PayloadAction<string>) => {
      state.htmlContent = action.payload;
    },
    setCssContent: (state, action: PayloadAction<string>) => {
      state.cssContent = action.payload;
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    setPublishedUrl: (state, action: PayloadAction<string>) => {
      state.publishedUrl = action.payload;
    },
    updateSeoData: (state, action: PayloadAction<Partial<PortfolioState['seoData']>>) => {
      state.seoData = { ...state.seoData, ...action.payload };
    },
    resetPortfolio: (state) => {
      return initialState;
    },
  },
});

export const {
  setTemplate,
  addSection,
  updateSection,
  removeSection,
  setHtmlContent,
  setCssContent,
  setGenerating,
  setPublishedUrl,
  updateSeoData,
  resetPortfolio,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
