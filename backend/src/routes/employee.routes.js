import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/Auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, upload.single("profileImage"), createEmployee);
router.get("/", verifyJWT, getAllEmployees);
router.get("/:id", verifyJWT, getEmployeeById);
router.put("/:id", verifyJWT, upload.single("profileImage"), updateEmployee);
router.delete("/:id", verifyJWT, deleteEmployee);

export default router;
