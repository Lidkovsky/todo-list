import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {
    setTasks: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError } = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.data;
// export const selectLoading = (state) => state.categories.isLoading;
// export const selectError = (state) => state.categories.error;

export default tasksSlice.reducer;
