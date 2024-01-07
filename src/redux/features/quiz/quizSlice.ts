import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  questions?: any[];
  progress?: number;
  score?: number;
  difficulty?: string;
}
const initialState: IInitialState = {
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
    addQuestions: (
      state,
      action: PayloadAction<Pick<IInitialState, "difficulty" | "questions">>,
    ) => {
      state.difficulty = action.payload.difficulty;
      state.questions = action?.payload?.questions;
    },

    incrementScore: (state, action: PayloadAction<number>) => {
      if (Number(state.score) < action.payload) {
        state.score!! += 1;
      }
      if (state.score === action.payload) {
        state.score = action.payload;
      }
    },
  },
});

export const { addQuestions, incrementScore } = quizSlice.actions;

export default quizSlice.reducer;
