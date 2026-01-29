import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersListType } from "@/types";


const initialState: OrdersListType[] = [];

const ListOrdersSlice = createSlice({
  name: "ordersList",
  initialState,
  reducers: {
    addOrderToList(_state, action: PayloadAction<OrdersListType[]>) {
          return action.payload;
    },
  },
});

export const { addOrderToList } = ListOrdersSlice.actions;
export default ListOrdersSlice.reducer;
