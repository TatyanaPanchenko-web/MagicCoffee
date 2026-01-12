import { configureStore } from "@reduxjs/toolkit";
import coffeeReducer from "./slice/coffeeSlice";
import currentReducer from "./slice/CurrentItemSlice";
import cartReducer from "./slice/CartSlice";
import orderReducer from "./slice/OrderSlice";
import preloaderReducer from "./slice/PreloaderSlice";
import usersReducer from "./slice/UsersSlice";

export const store = configureStore({
  reducer: {
    coffee: coffeeReducer,
    currentItem: currentReducer,
    cart: cartReducer,
    order: orderReducer,
    preloader: preloaderReducer,
    users: usersReducer,
  },
});
