import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },

  reducers: {
    addItemCart(state, action) {
      const cartEl = state.cart.find((el) => el.id === action.payload.id);
      if (cartEl) {
        cartEl.count++;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteItemCart(state, action) {
      const delEl = state.cart.filter((el) => el.id !== action.payload.id);
      state.cart = delEl;
    },
  },
  // extraReducers
});
export const { addItemCart, deleteItemCart } = CartSlice.actions;
export default CartSlice.reducer;
