import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getSecureCookie, 
  setSecureCookie, 
  removeSecureCookie 
} from '../../utils/secureCookie';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface PersistedCartState {
  items: CartItem[];
  totalAmount: number;
}

interface CartState extends PersistedCartState {
  cartAnimation: boolean;
}

const COOKIE_KEY = import.meta.env.VITE_COOKIE_KEY || 'cart_data';

// Helper function to calculate cart total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem: CartItem, { rejectWithValue, getState }) => {
    try {
      // Simulate API call or any async operation
      // In a real app, you might call your backend API here
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get current state to calculate new cart
      const state = getState() as { cart: CartState };
      const existingItem = state.cart.items.find(item => item.id === cartItem.id);
      
      const newItem = existingItem 
        ? { ...existingItem, quantity: existingItem.quantity + 1 }
        : { ...cartItem, quantity: 1 };
      
      return newItem;
    } catch (error) {
      return rejectWithValue('Failed to add item to cart');
    }
  }
);

// Load cart from encrypted cookie
const loadCartFromCookie = (): CartState => {
  try {
    const cookieData = getSecureCookie<PersistedCartState>(COOKIE_KEY);
    
    if (!cookieData) {
      return { items: [], totalAmount: 0, cartAnimation: false };
    }
    
    if (!Array.isArray(cookieData.items) || typeof cookieData.totalAmount !== 'number') {
      throw new Error('Invalid cart data structure');
    }
    
    const validItems = cookieData.items.filter(item => 
      item.id && 
      item.title && 
      typeof item.price === 'number' && 
      typeof item.quantity === 'number'
    );
    
    return { 
      items: validItems, 
      totalAmount: calculateTotal(validItems),
      cartAnimation: false 
    };
    
  } catch (error) {
    console.error('Failed to load cart from cookie:', error);
    removeSecureCookie(COOKIE_KEY);
    return { items: [], totalAmount: 0, cartAnimation: false };
  }
};

// Save cart to encrypted cookie
const saveCartToCookie = (state: CartState): void => {
  try {
    const { cartAnimation, ...persistData } = state;
    setSecureCookie(COOKIE_KEY, persistData);
  } catch (error) {
    console.error('Failed to save cart to cookie:', error);
  }
};

const initialState: CartState = loadCartFromCookie();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalAmount = calculateTotal(state.items);
      saveCartToCookie(state);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount = calculateTotal(state.items);
        saveCartToCookie(state);
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount = calculateTotal(state.items);
        saveCartToCookie(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      removeSecureCookie(COOKIE_KEY);
    },
    resetCartAnimation(state) {
      state.cartAnimation = false;
    },
    updateCartItem(
      state, 
      action: PayloadAction<{
        id: string, 
        updates: Partial<Omit<CartItem, 'id'>>
      }>
    ) {
      const { id, updates } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        Object.assign(item, updates);
        state.totalAmount = calculateTotal(state.items);
        saveCartToCookie(state);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.cartAnimation = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
        
        if (existingItem) {
          existingItem.quantity = newItem.quantity;
        } else {
          state.items.push(newItem);
        }
        
        state.totalAmount = calculateTotal(state.items);
        state.cartAnimation = false;
        saveCartToCookie(state);
      })
      .addCase(addToCart.rejected, (state) => {
        state.cartAnimation = false;
        // You could add error handling here
      });
  }
});

export const { 
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  resetCartAnimation,
  updateCartItem
} = cartSlice.actions;

export default cartSlice.reducer;