import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  progress: 0,
  score: 0,
  difficulty: "",
};

const sliceName = "quizSlice";

const quizSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addQuestions: (state, action: PayloadAction<any>) => {
      state.difficulty = action.payload.difficulty;
      state.questions = action?.payload?.questions;
      state.score = action.payload.score;
      state.progress = action.payload.progress;
    },
  },
});

export const { addQuestions } = quizSlice.actions;

export default quizSlice.reducer;
