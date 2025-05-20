import { configureStore } from "@reduxjs/toolkit";
import coffeeReducer from "./slice/coffeeSlice";
import currentReducer from "./slice/CurrentItemSlice";
import cartReducer from "./slice/CartSlice";
import orderReducer from "./slice/OrderSlice";

export const store = configureStore({
  reducer: {
    coffee: coffeeReducer,
    currentItem: currentReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
