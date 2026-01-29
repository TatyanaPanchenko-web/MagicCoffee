// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { auth } from "@/services/fireBase";
// import { CartType } from "../../types";

// const initialState: CartType[] = [];

// const OrderSlice = createSlice({
//   name: "order",
//   initialState,

//   reducers: {
//     addOrder(state, action: PayloadAction<CartType[]>) {
//       if (!auth.currentUser) return;
//       state.push({
//         items: action.payload,
//         date: new Date().toLocaleString("ru-RU"),
//         uid: auth?.currentUser?.uid,
//       });
//     },
//   },
// });
// export const { addOrder } = OrderSlice.actions;
// export default OrderSlice.reducer;
