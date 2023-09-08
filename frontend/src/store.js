import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./features/dashboard/dashboardSlice";
export const store = configureStore({
  reducer: {
    dashboardSlice,
  },
});
