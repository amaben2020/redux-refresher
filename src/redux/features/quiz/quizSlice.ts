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

    incrementScore: (state) => {
      state.score += 1;
    },
  },
});

export const { addQuestions, incrementScore } = quizSlice.actions;

export default quizSlice.reducer;
