import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./noteSlice";
const store = configureStore({
  reducer: noteSlice,
});

export default store;
