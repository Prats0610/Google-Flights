import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchReducer from "@/features/search/slice";
import resultsReducer from "@/features/results/slice";
const rootReducer = combineReducers({
  search: searchReducer,
  results: resultsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
