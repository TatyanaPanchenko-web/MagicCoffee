import { createSlice } from "@reduxjs/toolkit";
import type { CoffeeType } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState = null as CoffeeType | null;
const CurrentItemSlice = createSlice({
  name: "currentItem",
  initialState,

  reducers: {
    setCurrentItem(_state, action: PayloadAction<CoffeeType>) {
      return action.payload;
    },
    // incCurrentItem(state, action) {
    //   state.currentItem.count++;
    // },
    // decCurrentItem(state, action) {
    //   if (state.currentItem.count > 1) {
    //     state.currentItem.count--;
    //   }
    // },
    getVolumeItem(state) {
      if (!state) return;
      state.count += 1;
    },
  },
});

export const { setCurrentItem } = CurrentItemSlice.actions;
export default CurrentItemSlice.reducer;
