import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [
    {
      id: '1',
      name: 'Incursion CMR Compact Military Rebreather',
      category: 'military',
      price: 0,
      image: '/assets/images/product-placeholder.jpg',
      description: 'Compact military rebreather designed for tactical operations.',
    },
    {
      id: '2',
      name: 'Umbilical Supplied Rebreather',
      category: 'commercial',
      price: 161000,
      image: '/assets/images/product-placeholder.jpg',
      description: 'Professional umbilical supplied rebreather for commercial diving operations.',
    },
    {
      id: '3',
      name: 'Ironman HUD Divers Display',
      category: 'sports',
      price: 0,
      image: '/assets/images/product-placeholder.jpg',
      description: 'Advanced heads-up display for professional and sport divers.',
    },
    {
      id: '4',
      name: 'iBreathe MkIV Respiratory Simulator',
      category: 'respiratory',
      price: 143500,
      image: '/assets/images/product-placeholder.jpg',
      description: 'State-of-the-art respiratory simulation technology for training and validation.',
    },
    {
      id: '5',
      name: 'Special Forces Divers Tactical Vest',
      category: 'military',
      price: 0,
      image: '/assets/images/product-placeholder.jpg',
      description: 'Specialized tactical vest designed for military diving operations.',
    },
  ],
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