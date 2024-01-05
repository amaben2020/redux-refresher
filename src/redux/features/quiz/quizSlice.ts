import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  progress: 0,
  score: 0,
  difficulty: "",
};

const sliceName = "quizzes";

const quizSlice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {
    addQuestions: (state, action: PayloadAction<any>) => {
      state.difficulty = action.payload.difficulty;
      state.questions = action?.payload?.questions;
      state.score = action.payload.score;
      state.progress = action.payload.progress;
      return state;
    },
  },
});

export const { addQuestions } = quizSlice.actions;

export default quizSlice.reducer;
