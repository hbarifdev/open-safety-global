import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  parentCategorySlug: string | null;
  childCategorySlug: string | null;
  activeSubCategoryId: number | null;
}

const initialState: NavigationState = {
  parentCategorySlug: null,
  childCategorySlug: null,
  activeSubCategoryId: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigationFromURL: (
      state,
      action: PayloadAction<{ parentSlug: string; subCategorySlug: string }>
    ) => {
      state.parentCategorySlug = action.payload.parentSlug;
      state.childCategorySlug = action.payload.subCategorySlug;
    },
    setActiveSubCategoryId: (state, action: PayloadAction<number>) => {
      state.activeSubCategoryId = action.payload;
    },
    resetNavigation: state => {
      state.parentCategorySlug = null;
      state.childCategorySlug = null;
      state.activeSubCategoryId = null;
    },
  },
});

export const {
  setNavigationFromURL,
  setActiveSubCategoryId,
  resetNavigation,
} = navigationSlice.actions;

export default navigationSlice.reducer;
