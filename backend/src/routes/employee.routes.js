import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/Auth.js"; // Import the middleware
// import {upload} from "../middlewares/multer.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Protect the employee routes using verifyJWT middleware
router.post("/", verifyJWT, upload.single("image"), createEmployee); // Only authenticated users can create employees
router.get("/", verifyJWT, getAllEmployees); // Only authenticated users can get employees
router.get("/:id", verifyJWT, getEmployeeById); // Only authenticated users can get employee by ID
router.put("/:id", verifyJWT, updateEmployee); // Only authenticated users can update employees
router.delete("/:id", verifyJWT, deleteEmployee); // Only authenticated users can delete employees

export default router;
