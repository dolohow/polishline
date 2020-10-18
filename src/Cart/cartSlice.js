import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { addToCart } = cartSlice.actions;

export const selectCartItemsCount = state => state.cart.length;
export const selectCartItems = state => state.cart;

export default cartSlice.reducer;