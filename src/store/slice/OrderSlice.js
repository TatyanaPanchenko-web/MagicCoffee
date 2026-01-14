import { createSlice } from "@reduxjs/toolkit";
import { auth } from "@/services/fireBase";

const OrderSlice = createSlice({
  name: "order",
  initialState: [],

  reducers: {
    addOrder(state, action) {
      const orderWithDate = {
        ...action.payload,
        date: new Date().toLocaleString("ru-RU"),
        uid: auth.currentUser.uid,
      };
      state.push(orderWithDate);
    },
  },
});
export const { addOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
