import express from "express";
import {
  createCourse,
  enrollInCourse,
  getAllCourses,
  getAllCoursesPostedByInstructor,
  getCourseByIdCreatedByInstructor,
  getEnrolledStudentsForSpecificCourse,
  getMyEnrolledCourses,
  updateACourseCreatedByInstructor,
} from "../controller/courseController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/createCourse",
  verifyToken,
  authorizeRoles("instructor"),
  createCourse
);

router.get("/", getAllCourses);

router.post(
  "/:id/enroll",
  verifyToken,
  authorizeRoles("student"),
  enrollInCourse
);

router.get(
  "/enrolledCourses",
  verifyToken,
  authorizeRoles("student"),
  getMyEnrolledCourses
);

router.get(
  "/GetAllCoursesPostedByInstructor",
  verifyToken,
  authorizeRoles("instructor"),
  getAllCoursesPostedByInstructor
);

router.get(
  "/getCourseByIdCreatedByInstructor/:id",
  verifyToken,
  authorizeRoles("instructor"),
  getCourseByIdCreatedByInstructor
);

router.put(
  "/updateACourseCreatedByInstructor/:id",
  verifyToken,
  authorizeRoles("instructor"),
  updateACourseCreatedByInstructor
);

router.get(
  "/getEnrolledStudentsForSpecificCourse/:id/students",
  verifyToken,
  authorizeRoles("instructor"),
  getEnrolledStudentsForSpecificCourse
);
export default router;
