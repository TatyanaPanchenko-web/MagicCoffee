import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthFBType } from "../../types";

type initialType = {
  userInfo: UserAuthFBType | null;
  loadingStatus: boolean;
};
const initialState: initialType = {
  userInfo: null,
  loadingStatus: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDataAboutUser(state, action: PayloadAction<UserAuthFBType | null>) {
      if (!action.payload) return { ...state, userInfo: null };

      return { ...state, userInfo: action.payload };
    },
    changeLoadingStatus(state) {
      state.loadingStatus = true;
    },
  },
});

export const { setDataAboutUser, changeLoadingStatus } = UserSlice.actions;
export default UserSlice.reducer;
