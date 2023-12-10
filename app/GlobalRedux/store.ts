"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectTabReducer from "./Features/selectedTab/selectedTabSlice";
import categoriesReducer from "./Features/categoryList/categoriesSlice";
import tasksReducer from "./Features/tasksList/tasksSlice";

export const store = configureStore({
  reducer: {
    selectTab: selectTabReducer,
    categories: categoriesReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
