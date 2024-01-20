import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { EndPoints } from "../base/axios";

export const getSales = createAsyncThunk(
  "sales/getSales",
  async ({ id, name }: { id: string; name: string }) => {
    try {
      const response = await api.get(EndPoints.sales);
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
  },
);
