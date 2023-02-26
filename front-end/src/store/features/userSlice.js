import { createSlice } from "@reduxjs/toolkit";

let role = localStorage.getItem("role")
  ? JSON.parse(localStorage.getItem("role"))
  : null;

let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  role,
  user,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logged_in: (state, res) => {
      state.role = res.payload.user.role;
      state.user = res.payload.user;
      localStorage.setItem("user", JSON.stringify(res.payload.user));
      localStorage.setItem("role", JSON.stringify(res.payload.user.role));
    },
    logged_out: (state) => {
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      state.role = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logged_in, logged_out } = userSlice.actions;

export default userSlice.reducer;
