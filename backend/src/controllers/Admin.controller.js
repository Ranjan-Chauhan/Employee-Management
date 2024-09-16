// import { Admin } from "../models/admin.model.js";
// import createUser from "../services/signup.js";
// // import loginUser from "../services/login.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// // Signup controller
// export const adminSignup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if all fields are provided
//     if (!username || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide all required fields" });
//     }

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     // Create user using signup service
//     const user = await createUser({ username, email, password });

//     // Send success response
//     res.status(201).json({ user, message: "Admin created successfully" });
//   } catch (error) {
//     console.error("Error during admin signup:", error);
//     res.status(500).json({
//       message: error.message || "An unknown error occurred",
//     });
//   }
// };

// // Login controller

// /*
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate request body
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide both email and password" });
//     }
//     // Call login service to authenticate the user
//     const token = await loginUser(email, password);

//     // Find user to include additional details in response
//     const admin = await Admin.findOne({ email });

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       admin: {
//         id: user._id,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error during admin login:", error);
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// */

// // Login
// export const adminLogin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide both username and password" });
//     }

//     // findt the user by email
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // compare password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const jwtToken = jwt.sign(
//       { id: admin._id, username: admin.username },
//       process.env.JWT_SECRET || "fallbackSecret",
//       { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       jwtToken,
//       admin: {
//         id: admin._id,
//         username: admin.username, // Make sure this is returned
//       },
//     });
//   } catch (error) {
//     console.error("Error during admin login:", error);
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message || "Unknown error occurred",
//     });
//   }
// };
