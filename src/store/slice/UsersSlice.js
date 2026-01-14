import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return { ...action.payload };
    },
  },
});
export const { setUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
