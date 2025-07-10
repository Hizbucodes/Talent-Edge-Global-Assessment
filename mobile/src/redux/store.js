import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import courseReducer from "../redux/slices/courseSlice";
import toastReducer from "../redux/slices/toastSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    course: courseReducer,
  },
});

export default store;
