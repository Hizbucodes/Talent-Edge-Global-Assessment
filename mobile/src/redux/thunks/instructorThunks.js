import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchInstructorCourses = createAsyncThunk(
  "instructor/fetchInstructorCourses",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/courses/GetAllCoursesPostedByInstructor");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch instructor courses"
      );
    }
  }
);

export const createCourse = createAsyncThunk(
  "instructor/createCourse",
  async (courseData, thunkAPI) => {
    try {
      const res = await API.post("/courses/createCourse", courseData);
      return res.data.course;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Course creation failed"
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  "instructor/updateCourse",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.put(
        `/courses/updateACourseCreatedByInstructor/${id}`,
        data
      );
      return res.data.course;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Course update failed"
      );
    }
  }
);

// ✅ Get enrolled students for a specific course
export const fetchEnrolledStudents = createAsyncThunk(
  "instructor/fetchEnrolledStudents",
  async (courseId, thunkAPI) => {
    try {
      const res = await API.get(
        `/courses/getEnrolledStudentsForSpecificCourse/${courseId}/students`
      );
      return res.data.students; // Adjust key based on actual response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch enrolled students"
      );
    }
  }
);
