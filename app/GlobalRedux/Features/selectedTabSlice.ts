import { Categories } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

export interface SelectedTabState {
  id: string;
  category: string | null;
}

const initialState: SelectedTabState = {
  id: "0",
  category: null,
};

const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState,
  reducers: {
    updateTab: (state, action) => {
      state.category = action.payload.category;
      state.id = action.payload.id;
    },
  },
});

export const { updateTab } = selectedTabSlice.actions;
export default selectedTabSlice.reducer;
