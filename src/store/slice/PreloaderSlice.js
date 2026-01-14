import { createSlice } from "@reduxjs/toolkit";

const PreloaderSlice = createSlice({
  name: "preloader",
  initialState: { preloader: false },

  reducers: {
    activatePreloader(state) {
      state.preloader = true;
    },
    deactivatePreloader(state) {
      state.preloader = false;
    },
  },
});
export const { activatePreloader, deactivatePreloader } =
  PreloaderSlice.actions;
export default PreloaderSlice.reducer;
