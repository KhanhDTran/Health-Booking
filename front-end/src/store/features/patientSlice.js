import { createSlice } from "@reduxjs/toolkit";

let selectedDoctor = localStorage.getItem("selectedDoctor")
  ? JSON.parse(localStorage.getItem("selectedDoctor"))
  : null;

const initialState = {
  selectedDoctor,
  patient: null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    select_doctor: (state, { payload }) => {
   
      state.selectedDoctor = payload;
      localStorage.setItem("selectedDoctor", JSON.stringify(payload));
    },
    remove_selected_doctor: (state) => {
      localStorage.removeItem("selectedDoctor");
      state.selectedDoctor = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { select_doctor, remove_selected_doctor } = patientSlice.actions;

export default patientSlice.reducer;
