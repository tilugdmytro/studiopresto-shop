import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter(productId => productId !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
