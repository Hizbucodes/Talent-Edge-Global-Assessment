import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    console.log("Course Created by:", req.user.id);
    if (!title || !description || !Array.isArray(content)) {
      return res
        .status(400)
        .json({ message: "Title, description, and content are required." });
    }

    const course = await Course.create({
      title,
      description,
      content,
      instructor: req.user.id,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdCourses: course._id },
    });

    res.status(201).json({
      status: "success",
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    console.error("Create Course Error:", error);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor",
      "username name email"
    );

    res.status(200).json({
      status: "success",
      total: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Get All Courses Error:", error);
    res.status(500).json({
      status: "fail",
      message: "Failed to retrieve courses. Please try again later.",
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const alreadyEnrolled = course.enrolledStudents.some((studentId) =>
      studentId.equals(req.user.id)
    );
    if (alreadyEnrolled) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course." });
    }

    course.enrolledStudents.push(req.user.id);
    await course.save();

    const user = await User.findById(req.user.id);
    user.enrolledCourses.push(course._id);
    await user.save();

    res.status(200).json({
      status: "success",
      message: `Enrolled in course: ${course.title}`,
      course,
    });
  } catch (error) {
    console.error("Enroll Error:", error);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

export const getMyEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "enrolledCourses",
      populate: {
        path: "instructor",
        select: "username email",
      },
    });

    console.log(req.user.id);

    res.status(200).json({
      status: "success",
      total: user.enrolledCourses.length,
      courses: user.enrolledCourses,
    });
  } catch (error) {
    console.error("Get Enrolled Courses Error:", error);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

export const getAllCoursesPostedByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this instructor.",
      });
    }

    res.status(200).json({
      status: "success",
      total: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

export const getCourseByIdCreatedByInstructor = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "enrolledStudents",
      "username email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied. Not the course owner." });
    }

    res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

export const updateACourseCreatedByInstructor = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const courseId = req.params.id;
    const instructorId = req.user.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== instructorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this course." });
    }

    if (title?.trim()) course.title = title;
    if (description?.trim()) course.description = description;
    if (Array.isArray(content)) course.content = content;

    const updatedCourse = await course.save();

    res.status(200).json({
      status: "success",
      message: "Course updated successfully.",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ status: "fail", message: "Internal server error." });
  }
};

export const getEnrolledStudentsForSpecificCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "enrolledStudents",
      "username email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({
      status: "success",
      total: course.enrolledStudents.length,
      students: course.enrolledStudents,
    });
  } catch (error) {
    console.error("Error getting enrolled students:", error);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

export const deleteACourseCreatedByInstructor = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not the course owner." });
    }

    await course.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
};
