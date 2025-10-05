import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  currentStep: number
  totalSteps: number
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  currentStep: 1,
  totalSteps: 5,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    clearMessages: (state) => {
      state.messages = []
      state.currentStep = 1
    },
  },
})

export const { addMessage, setLoading, setCurrentStep, clearMessages } = chatSlice.actions
export default chatSlice.reducer
