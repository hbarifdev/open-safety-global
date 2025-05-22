import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExchangeRate = createAsyncThunk(
  'currency/fetchExchangeRate',
  async (currencyCode: string) => {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/ae7086f43cfcd7f362d1e4ca/latest/USD`);
    const data = await res.json();

    if (!data || data.result !== 'success' || !data.conversion_rates[currencyCode]) {
      throw new Error('Failed to fetch exchange rate');
    }

    return {
      rate: data.conversion_rates[currencyCode],
      code: currencyCode,
    };
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selectedCurrency: 'USD',
    exchangeRate: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
      state.exchangeRate = action.payload.rate;
      state.selectedCurrency = action.payload.code;
    });
  },
});

export default currencySlice.reducer;
