import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentStep: number;
  totalSteps: number;
  userProfile: {
    name?: string;
    role?: string;
    skills?: string[];
    projects?: any[];
    experience?: string;
  };
}

const initialState: ChatState = {
  messages: [
    {
      id: '1',
      content: "Hi! I'm your AI portfolio assistant. Let's create an amazing portfolio together. What's your name?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ],
  isTyping: false,
  currentStep: 1,
  totalSteps: 5,
  userProfile: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id' | 'timestamp'>>) => {
      const message: Message = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      state.messages.push(message);
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    updateStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<ChatState['userProfile']>>) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    clearChat: (state) => {
      state.messages = initialState.messages;
      state.currentStep = 1;
      state.userProfile = {};
    },
  },
});

export const { addMessage, setTyping, updateStep, updateUserProfile, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
