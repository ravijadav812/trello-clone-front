import { configureStore } from "@reduxjs/toolkit";
import { stageAPI } from "../services/Stage";

export const store = configureStore({
  reducer: {
    [stageAPI.reducerPath]: stageAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stageAPI.middleware),
});
