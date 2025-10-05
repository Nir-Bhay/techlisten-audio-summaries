import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chatSlice'
import portfolioReducer from './portfolioSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    portfolio: portfolioReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
