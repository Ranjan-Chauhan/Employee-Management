import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/Auth.js";

const router = express.Router();

// router.get("/list", verifyJWT, employeeListController);
// router.post("/create", verifyJWT, createEmployeeController);

// Create Employee
router.post("/", createEmployee);

// Get All Employees
router.get("/", getAllEmployees);

// Get Employee by ID
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

export default router;
