import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;
const PreloaderSlice = createSlice({
  name: "preloader",
  initialState,

  reducers: {
    activatePreloader(_state) {
      return true;
    },
    deactivatePreloader(_state) {
      return false;
    },
  },
});
export const { activatePreloader, deactivatePreloader } =
  PreloaderSlice.actions;
export default PreloaderSlice.reducer;
