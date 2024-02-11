import { URL } from "@/app/nasa/page";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const nasaThunk = createAsyncThunk(
  "nasa/fetchData",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue("Failed to fetch Nasa");
    }
  },
);
