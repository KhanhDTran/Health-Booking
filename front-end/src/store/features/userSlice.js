import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      toast.success("Đã đăng xuất");
    },
    edit_patient_profile: (state, res) => {
      console.log(res);
      state.user = res.payload.user;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(res.payload.user));
    },
  },
});

// Action creators are generated for each case reducer function
export const { logged_in, logged_out, edit_patient_profile } =
  userSlice.actions;

export default userSlice.reducer;
