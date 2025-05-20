import { createSlice } from "@reduxjs/toolkit";

const CurrentItemSlice = createSlice({
  name: "currentItem",
  initialState: { currentItem: [] },

  reducers: {
    setCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
    incCurrentItem(state, action) {
      state.currentItem.count++;
    },
    decCurrentItem(state, action) {
      if (state.currentItem.count > 1) {
        state.currentItem.count--;
      }
    },
    getVolumeItem(state, action) {
      state.currentItem.count++;
    },
  },
});

export const { setCurrentItem, incCurrentItem, decCurrentItem } =
  CurrentItemSlice.actions;
export default CurrentItemSlice.reducer;
