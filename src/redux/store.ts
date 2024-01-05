import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
