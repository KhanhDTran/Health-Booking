import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../services/commonSv";

const initialState = {
  specialties: null,
  clinics: null,
};

export const fetchDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSpecialties.fulfilled, (state, { payload }) => {
      if (payload) state.specialties = payload;
    });
    builder.addCase(fetchAllClinics.fulfilled, (state, { payload }) => {
      if (payload) state.clinics = payload;
    });
  },
});

export const fetchAllClinics = createAsyncThunk(
  "fetchData/all-clinics",
  async () => {
    try {
      let res = await getRequest("/getData/all-clinics");
      if (res && res.clinics) return res.clinics;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAllSpecialties = createAsyncThunk(
  "fetchData/all-specialties",
  async () => {
    try {
      let res = await getRequest("/getData/all-specialties");
      if (res && res.specialties) return res.specialties;
    } catch (e) {
      console.log(e);
    }
  }
);

// Action creators are generated for each case reducer function
export const {} = fetchDataSlice.actions;

export default fetchDataSlice.reducer;
