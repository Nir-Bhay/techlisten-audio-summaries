import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  sidebarOpen: boolean;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  currentPage: 'landing' | 'chat' | 'templates' | 'builder' | 'settings' | 'dashboard';
  showSettings: boolean;
  showAnalytics: boolean;
  loading: boolean;
}

const initialState: UIState = {
  sidebarOpen: false,
  previewMode: 'desktop',
  currentPage: 'landing',
  showSettings: false,
  showAnalytics: false,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setPreviewMode: (state, action: PayloadAction<UIState['previewMode']>) => {
      state.previewMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<UIState['currentPage']>) => {
      state.currentPage = action.payload;
    },
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },
    toggleAnalytics: (state) => {
      state.showAnalytics = !state.showAnalytics;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setPreviewMode,
  setCurrentPage,
  toggleSettings,
  toggleAnalytics,
  setLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
