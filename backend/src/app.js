import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import signupRoutes from "./routes/adminRoutes.js/signup.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import signupRoutes from "./routes/admin.routes.js";
import loginRoutes from "./routes/admin.routes.js";
// import { createAdminAccount } from "./scripts/admin.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.static("public")); // To serve static files from the 'public' folder
app.use(cookieParser());
app.use(bodyParser.json());

// createAdminAccount();

// Routes declaration
app.use("/api/admin", signupRoutes);
app.use("/api/admin", loginRoutes);
app.use("/api/employees", employeeRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };
