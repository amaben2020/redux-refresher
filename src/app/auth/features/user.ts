import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/api/users";

type TUserData = {
  data: null;
  status: "loading" | "failed" | "succeeded";
  error: string | undefined;
};

// teacher: null,
// student: null,

const initialState: TUserData = {
  data: null,
  status: "loading",
  error: "",
};

// asynchronous function with createAsyncThunk
export const fetchUsersData = createAsyncThunk(
  "user/fetchUsersData",
  async (amount: number) => {
    // any api service
    const response = await fetchUsers(amount);
    return response.data;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: () => {},
    logoutUser: () => {},
    setStudent: () => {},
    logoutStudent: () => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
