"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectTabReducer from "./Features/selectedTabSlice";
import categoriesSlice from "./Features/categoriesSlice";
import tasksSlice from "./Features/tasksSlice";
import userIdSlice from "./Features/userSlice";

import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    selectTab: selectTabReducer,
    categories: categoriesSlice,
    tasks: tasksSlice,
    userId: userIdSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
