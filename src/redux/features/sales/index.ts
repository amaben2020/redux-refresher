import { getSales } from "@/services/api/sales";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  id: string;
  name: string;
  data: Array<number>;
  loading: boolean;
  error: string | undefined;
};

const initialState: TInitialState = {
  id: "",
  name: "",
  data: [],
  loading: false,
  error: "",
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSales.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSales.fulfilled, (state, action) => {
      console.log(action);
      state.data = action.payload;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.loading = false;
    });

    builder.addCase(getSales.rejected, (state, action) => {
      state.error = action.error as string;
    });
  },
});

export default salesSlice.reducer;
