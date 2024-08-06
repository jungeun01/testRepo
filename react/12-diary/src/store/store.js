import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "./diarySlice";
import userSlice from "./userSilce";

const store = configureStore({
  reducer: {
    diary: diarySlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
