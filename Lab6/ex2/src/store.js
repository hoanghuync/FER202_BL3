import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter((item, idx) => idx !== action.payload);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const store = configureStore({
  reducer: { cart: cartSlice.reducer }
});
