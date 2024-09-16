import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    // Find the admin by email (matching the registration process)
    const user = await Admin.findOne({ email });

    // Check if admin exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Check if password is present in the admin document
    if (!user.password) {
      return res.status(500).json({ message: "Password not set for admin" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // Generic invalid credentials message
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "fallbackSecret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    // Successful login
    return res.status(200).json({
      message: "Login successful",
      jwtToken,
      admin: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Enhanced error logging
    console.error("Error during admin login:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message || "Unknown error occurred",
    });
  }
};
