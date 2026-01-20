import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import coffeeListReducer from "./slice/CoffeeListSlice";
import currentReducer from "./slice/CurrentItemSlice";
import cartReducer from "./slice/CartSlice";
import orderReducer from "./slice/OrderSlice";
import preloaderReducer from "./slice/PreloaderSlice";
import userReducer from "./slice/UserSlice";

export const store = configureStore({
  reducer: {
    coffeeList: coffeeListReducer,
    currentItem: currentReducer,
    cart: cartReducer,
    order: orderReducer,
    preloader: preloaderReducer,
    user: userReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();

export const useAppSelector = useSelector.withTypes<RootStateType>();
