// In results/slice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ResultsState {
  status: "idle" | "loading" | "success" | "error";
  itineraries: any[];
}

const initialState: ResultsState = {
  status: "idle",
  itineraries: [],
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<any[]>) => {
      state.itineraries = action.payload;
      state.status = "success";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state) => {
      state.status = "error";
    },
  },
});

export const { setResults, setLoading, setError } = resultsSlice.actions;
export default resultsSlice.reducer;
