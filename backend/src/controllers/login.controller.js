import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    // Find the admin by email
    const user = await Admin.findOne({ email });

    // Check if admin exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Use the isPasswordCorrect method to check if the password matches
    const isMatch = await user.isPasswordCorrect(password);

    // If password does not match, return an error
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token if password is correct
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "fallbackSecret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    // Return successful login response
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
    // Error handling
    console.error("Error during admin login:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message || "Unknown error occurred",
    });
  }
};
