import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import { saveToken } from "../../utils/token";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await API.post("/auth/login", credentials);
      await saveToken(response.data.token);
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);
