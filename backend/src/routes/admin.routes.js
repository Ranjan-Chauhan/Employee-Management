import { Router } from "express";
import { adminLogin } from "../controllers/login.controller.js";
import { adminRegister } from "../controllers/register.controller.js";

const router = Router();

router.post("/signup", adminRegister);
router.post("/login", adminLogin);

export default router;
