import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      //console.log(action.payload);
      return { ...action.payload };
    },
  },
});
export const { setUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
