import express from "express";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", createCourse); // Create new course
router.get("/", getCourses); // Get all courses
router.put("/:id", updateCourse); // Update a course by ID
router.delete("/:id", deleteCourse); // Delete a course by ID

export default router;
