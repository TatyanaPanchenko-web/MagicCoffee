import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartType = {
  count: number;
  id: string;
  name: string;
  price: number;
  ristretto: string;
  volume: number;
  where: string;
};

const initialState: CartType[] = [];
const CartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItemCart(state, action: PayloadAction<CartType>) {
      const cartEl = state.find(
        (el) =>
          el.id === action.payload.id &&
          el.volume === action.payload.volume &&
          el.ristretto === action.payload.ristretto,
      );
      if (cartEl) {
        cartEl.count++;
      } else {
        state.push(action.payload);
      }
    },
    deleteItemCart(state, action: PayloadAction<{ id: string }>) {
      return state.filter((el) => el.id !== action.payload.id);
    },
    deleteAllCart() {
      return [];
    },
  },
  // extraReducers
});
export const { addItemCart, deleteItemCart, deleteAllCart } = CartSlice.actions;
export default CartSlice.reducer;
