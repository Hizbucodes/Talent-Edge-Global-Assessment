import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/getAllCourses",
  verifyToken,
  authorizeRoles("student"),
  (req, res) => {
    res.json({ message: "getting all courses" });
  }
);

export default router;
