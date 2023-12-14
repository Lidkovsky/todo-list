import { createSlice } from "@reduxjs/toolkit";

export interface userIdSliceState {
  id: null | string;
}

const initialState: userIdSliceState = {
  id: null,
};

const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
