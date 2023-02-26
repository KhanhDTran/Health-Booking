import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../services/commonSv";

const initialState = {
  specialties: null,
};

export const fetchDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSpecialties.fulfilled, (state, { payload }) => {
      if (payload) state.specialties = payload;
    });
  },
});

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
