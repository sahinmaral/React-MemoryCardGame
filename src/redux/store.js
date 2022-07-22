import { configureStore } from '@reduxjs/toolkit'
import cardGameSlice from './cardGameSlice'

export const store = configureStore({
  reducer: {
    cardGame : cardGameSlice
  },
})