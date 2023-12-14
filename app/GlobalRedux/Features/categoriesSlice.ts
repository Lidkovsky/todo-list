import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Categories } from "@/lib/types";
import supabase from "@/supabase";
import DeleteCategory from "@/components/DeleteCategory";

export interface CategoriesState {
  loading: boolean;
  data: Categories[];
  error: string;
}

const initialState: CategoriesState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchCategories = createAsyncThunk<Categories[], void>(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await supabase.from("categories").select("*");

      return response.data || [];
    } catch (error) {
      throw error;
    }
  }
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      state.data = state.data.filter((c) => c.id != action.payload);
      console.log(action.payload);
    },
    addCategory: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch categories.";
      });
  },
});
export const { deleteCategory, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
