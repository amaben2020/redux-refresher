import { createSlice } from "@reduxjs/toolkit";
import { nasaThunk } from "./services";

export type TNasaState = {
  data: {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
  }[];
  loading: "idle" | "pending";
  error: string;
};
const initialState: TNasaState = {
  data: [],
  loading: "idle",
  error: "",
};

const nasaSlice = createSlice({
  name: "nasaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(nasaThunk.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(nasaThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "idle";
      state.error = "null";
    });
    builder.addCase(nasaThunk.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message as string;
    });
  },
});

export default nasaSlice.reducer;
