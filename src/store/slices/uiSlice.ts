import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  activeTab: string;
  currency: string;
  isSearchOpen: boolean;
  currentSlide: number;
}

const initialState: UiState = {
  activeTab: 'featured',
  currency: 'USD',
  isSearchOpen: false,
  currentSlide: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setCurrentSlide(state, action: PayloadAction<number>) {
      state.currentSlide = action.payload;
    },
  },
});

export const { setActiveTab, setCurrency, toggleSearch, setCurrentSlide } = uiSlice.actions;
export default uiSlice.reducer;