import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getAllProducts } from '../api/getProducts';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkApi) => {
  try {
    const data = await getAllProducts();
    return data;
  } catch (error: any) {
    console.error(error)
    return thunkApi.rejectWithValue(error.message);
  }
});

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: null;
}

const initialState: ProductsState = {
  products: [],
  isLoading: true,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
