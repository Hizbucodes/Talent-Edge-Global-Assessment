import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchAllCourses = createAsyncThunk(
  "student/fetchAllCourses",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/courses/");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

export const enrollInCourse = createAsyncThunk(
  "student/enrollInCourse",
  async (courseId, thunkAPI) => {
    try {
      const res = await API.post(`/courses/${courseId}/enroll`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to enroll in course"
      );
    }
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  "student/fetchEnrolledCourses",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/courses/enrolledCourses");
      return res.data.courses;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch enrolled courses"
      );
    }
  }
);
