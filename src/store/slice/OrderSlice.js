import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: { order: [] },

  reducers: {
    addOrder(state, action) {
      state.order.push(action.payload);
    },
  },
});
export const { addOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
