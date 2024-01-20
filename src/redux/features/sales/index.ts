import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  id: string;
  name: string;
  data: Array<number>;
};

const initialState: TInitialState = {
  id: "",
  name: "",
  data: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: () => {
    
  },
});

export default salesSlice.reducer

