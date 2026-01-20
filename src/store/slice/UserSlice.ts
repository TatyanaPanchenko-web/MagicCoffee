import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

const initialState: UserType[] = [];
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<UserType[]>) {
      return { ...action.payload };
    },
  },
});
export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
