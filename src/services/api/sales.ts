import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { EndPoints } from "../base/axios";

export const getSales = createAsyncThunk("sales/getSales", async () => {
  try {
    const response = await api.get(EndPoints.sales);
    return response.data;
  } catch (error) {
    if (error instanceof Error) return error.message;
  }
});
