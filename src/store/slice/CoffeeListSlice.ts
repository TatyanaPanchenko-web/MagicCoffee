import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CoffeeListType = {
  count: number;
  id: string;
  name: string;
  price: number[];
  ristretto: string[];
  volume: number[];
  where: string[];
};

const initialState: CoffeeListType[] = [];

const CoffeeListSlice = createSlice({
  name: "coffeeList",
  initialState,
  reducers: {
    setCoffee(_state, action: PayloadAction<CoffeeListType[]>) {
      return action.payload;
    },
  },
});
export const { setCoffee } = CoffeeListSlice.actions;
export default CoffeeListSlice.reducer;
