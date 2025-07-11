import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  documentId: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  featured: {
    url: string;
  };
  description: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    filterProducts(state, action: PayloadAction<string>) {
      const category = action.payload;
      if (category === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          product => product.category === category
        );
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, filterProducts, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;