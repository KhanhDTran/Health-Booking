import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../services/commonSv";

const initialState = {
  specialties: null,
  clinics: null,
  labs: null,
  doctors: null,
  schedules: null,
  services: null,
  patients: null,
  bookings: null,
  records: null,
  results: null,
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
    builder.addCase(fetchScedules.fulfilled, (state, { payload }) => {
      if (payload) state.schedules = payload;
    });
    builder.addCase(fetchServices.fulfilled, (state, { payload }) => {
      if (payload) state.services = payload;
    });
    builder.addCase(fetchPatients.fulfilled, (state, { payload }) => {
      if (payload) state.patients = payload;
    });
    builder.addCase(fetchBookings.fulfilled, (state, { payload }) => {
      if (payload) state.bookings = payload;
    });
    builder.addCase(fetchRecords.fulfilled, (state, { payload }) => {
      if (payload) state.records = payload;
    });
    builder.addCase(fetchResults.fulfilled, (state, { payload }) => {
      if (payload) state.results = payload;
    });
  },
});

export const fetchResults = createAsyncThunk(
  "fetchData/get-results",
  async (query) => {
    try {
      let res = await getRequest("/getData/get-results", query);
      if (res && res.results) return res.results;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchRecords = createAsyncThunk(
  "fetchData/get-records",
  async (query) => {
    try {
      let res = await getRequest("/getData/get-records", query);
      if (res && res.records) return res.records;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "fetchData/get-bookings",
  async (query) => {
    try {
      let res = await getRequest("/getData/get-bookings", query);
      if (res && res.bookings) return res.bookings;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchPatients = createAsyncThunk(
  "fetchData/get-patients",
  async (query) => {
    try {
      let res = await getRequest("/getData/get-patients", query);
      if (res && res.patients) return res.patients;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchServices = createAsyncThunk(
  "fetchData/get-services",
  async (query) => {
    try {
      let res = await getRequest("/getData/get-services", query);
      if (res && res.services) return res.services;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchScedules = createAsyncThunk(
  "fetchData/get-schedules",
  async (query) => {
    try {
      let res = await getRequest("/getData/get-schedules", query);
      if (res && res.schedules) return res.schedules;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAllDoctors = createAsyncThunk(
  "fetchData/all-doctors",
  async (query) => {
    try {
      let res = await getRequest("/getData/all-doctors", query);
      if (res && res.doctors) return res.doctors;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAllLabs = createAsyncThunk(
  "fetchData/all-labs",
  async (query) => {
    try {
      let res = await getRequest("/getData/all-labs", query);
      if (res && res.labs) return res.labs;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAllClinics = createAsyncThunk(
  "fetchData/all-clinics",
  async (query) => {
    try {
      let res = await getRequest("/getData/all-clinics", query);
      if (res && res.clinics) return res.clinics;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAllSpecialties = createAsyncThunk(
  "fetchData/all-specialties",
  async (query) => {
    try {
      let res = await getRequest("/getData/all-specialties", query);
      if (res && res.specialties) return res.specialties;
    } catch (e) {
      console.log(e);
    }
  }
);

// Action creators are generated for each case reducer function
export const {} = fetchDataSlice.actions;

export default fetchDataSlice.reducer;
