import { createSlice } from "@reduxjs/toolkit";

const CoffeeSlice = createSlice({
  name: "coffee",
  initialState: [],
  reducers: {
    setCoffee(state, action) {
      return [...action.payload];
    },
  },
});
export const { setCoffee } = CoffeeSlice.actions;
export default CoffeeSlice.reducer;
