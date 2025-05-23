import { configureStore, current } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';
import currencyReducer from './slices/currencySlice';
import navigationReducer from './slices/navigationSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    ui: uiReducer,
    currency: currencyReducer,
    navigation: navigationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;