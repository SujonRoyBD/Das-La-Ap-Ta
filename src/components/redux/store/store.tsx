// components/redux/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'  // cartSlice ঠিকমতো ইম্পোর্ট করতে হবে

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
