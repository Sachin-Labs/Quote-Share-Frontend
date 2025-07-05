import { createSlice } from "@reduxjs/toolkit";

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    quotes: [],
  },
  reducers: {
    removeQuote: (state, action) => {
      state.quotes = [];
    },
    setQuotes: (state, action) => {
      state.quotes = action.payload;
    },
  },
});

export const {removeQuote,setQuotes } =
  quoteSlice.actions;
export default quoteSlice.reducer;
