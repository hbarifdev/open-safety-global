import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';
import currencyReducer from './slices/currencySlice';
import navigationReducer from './slices/navigationSlice';
import { apiSlice } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    currency: currencyReducer,
    navigation: navigationReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
