import { createSlice } from "@reduxjs/toolkit";

const PreloaderSlice = createSlice({
  name: "preloader",
  initialState: { preloader: false },

  reducers: {
    activatePreloader(state) {
      state.preloader = true;
      console.log(state.preloader);
    },
    deactivatePreloader(state) {
      state.preloader = false;
      console.log(state.preloader);
    },
  },
});
export const { activatePreloader, deactivatePreloader } =
  PreloaderSlice.actions;
export default PreloaderSlice.reducer;
