import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductWithQuantity } from '../types/Product';

interface CartState {
  cartProducts: ProductWithQuantity[];
}

const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;
      const existingProduct = state.cartProducts.find((product) => product.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload);
    },

    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const {
  addCartItem,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
