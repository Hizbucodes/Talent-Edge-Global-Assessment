// routes/aiRoutes.js
import express from "express";
import { getCourseSuggestions } from "../controller/chatGPTController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.post(
  "/suggestCourses",
  verifyToken,
  authorizeRoles("student"),
  getCourseSuggestions
);

export default router;
