import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },

  reducers: {
    addItemCart(state, action) {
      console.log(action);
      const cartEl = state.cart.find(
        (el) =>
          el.id === action.payload.id &&
          el.volume === action.payload.volume &&
          el.ristretto === action.payload.ristretto
      );
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
    deleteAllCart(state) {
      state.cart = [];
    },
  },
  // extraReducers
});
export const { addItemCart, deleteItemCart, deleteAllCart } = CartSlice.actions;
export default CartSlice.reducer;
