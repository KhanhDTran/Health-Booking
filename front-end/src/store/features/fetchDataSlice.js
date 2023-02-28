import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../services/commonSv";

const initialState = {
  specialties: null,
  clinics: null,
  labs: null,
  doctors: null,
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
    builder.addCase(fetchAllLabs.fulfilled, (state, { payload }) => {
      if (payload) state.labs = payload;
    });
    builder.addCase(fetchAllDoctors.fulfilled, (state, { payload }) => {
      if (payload) state.doctors = payload;
    });
  },
});

export const fetchAllDoctors = createAsyncThunk(
  "fetchData/all-doctors",
  async () => {
    try {
      let res = await getRequest("/getData/all-doctors");
      if (res && res.doctors) return res.doctors;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAllLabs = createAsyncThunk("fetchData/all-labs", async () => {
  try {
    let res = await getRequest("/getData/all-labs");
    if (res && res.labs) return res.labs;
  } catch (e) {
    console.log(e);
  }
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
