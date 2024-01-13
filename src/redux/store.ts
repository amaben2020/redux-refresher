import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import authSlice from "./../../../redux-refresher/src/app/auth/features/user";
import quizSlice from "./features/quiz/quizSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  quiz: quizSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export let persistor = persistStore(store);
