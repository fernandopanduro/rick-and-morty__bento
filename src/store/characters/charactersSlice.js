import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: {} };

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = charactersSlice.actions;

export default charactersSlice.reducer;
