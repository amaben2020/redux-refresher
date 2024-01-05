// import { configureStore } from "@reduxjs/toolkit";
// import quizReducer from "./features/quiz/quizSlice";

// export const store = configureStore({
//   reducer: {
//     quiz: quizReducer,
//   },
// });

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof store.getState>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

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
import quizSlice from "./features/quiz/quizSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  quiz: quizSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

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
