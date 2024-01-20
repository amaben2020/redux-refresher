import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersData } from "./api/fetchUser";

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

const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers: {
  //   setUser: () => {},
  //   logoutUser: () => {},
  //   setStudent: () => {},
  //   logoutStudent: () => {},
  // },

  reducers: {},
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
