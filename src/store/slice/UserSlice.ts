import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthFBType } from "../../types";

const initialState = null as UserAuthFBType | null;

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDataAboutUser(
      _state,
      action: PayloadAction<UserAuthFBType | null>,
    ): UserAuthFBType | null {
      if (!action.payload) return null;

      return action.payload;
    },
  },
});

export const { setDataAboutUser } = UserSlice.actions;
export default UserSlice.reducer;
