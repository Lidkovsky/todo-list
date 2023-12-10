import { Categories } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

export interface categoriesState {
  data: Categories[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: categoriesState = {
  data: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
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

export const { setCategories, setLoading, setError } = categoriesSlice.actions;
export const selectCategories = (state) => state.categories.data;
// export const selectLoading = (state) => state.categories.isLoading;
// export const selectError = (state) => state.categories.error;

export default categoriesSlice.reducer;
