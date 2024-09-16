import { Router } from "express";
import { adminLogin } from "../controllers/login.controller.js";
// import { verifyJWT } from "../../middlewares/Auth.js";
import { adminRegister } from "../controllers/register.controller.js";

const router = Router();

// Admin signup route
router.post("/signup", adminRegister);

// Admin login route
router.post("/login", adminLogin);

// router.get("/me", verifyJWT, getUserDetails);

export default router;
