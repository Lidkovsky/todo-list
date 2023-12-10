import { createSlice } from "@reduxjs/toolkit";

export interface SelectedTabState {
  value: string;
}

const initialState: SelectedTabState = {
  value: "My tasks",
};

const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState,
  reducers: {
    updateTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateTab } = selectedTabSlice.actions;
export default selectedTabSlice.reducer;
