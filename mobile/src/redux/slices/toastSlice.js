import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  message: "",
  title: "",
  type: "success",
  duration: 3000,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      const {
        message,
        title,
        type = "success",
        duration = 3000,
      } = action.payload;
      state.visible = true;
      state.message = message;
      state.title = title;
      state.type = type;
      state.duration = duration;
    },
    hideToast: (state) => {
      state.visible = false;
      state.message = "";
      state.title = "";
      state.type = "success";
      state.duration = 3000;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
