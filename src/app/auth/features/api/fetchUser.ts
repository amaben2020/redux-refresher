import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/api/users";

// asynchronous function with createAsyncThunk
export const fetchUsersData = createAsyncThunk(
  "user/fetchUsersData",
  async (amount: number) => {
    // any api service
    const response = await fetchUsers(amount);
    return response.data;
  },
);
