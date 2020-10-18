import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './Cart/cartSlice';

export default configureStore({
  reducer: {
    cart: cartReducer
  }
})