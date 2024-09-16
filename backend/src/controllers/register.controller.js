import bcrypt from "bcrypt";
import { Admin } from "../models/admin.model.js";

export const adminRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance with hashed password
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new admin to the database
    const savedAdmin = await newAdmin.save();

    // Send success response
    res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        email: savedAdmin.email,
        password: savedAdmin.password,
      },
    });
  } catch (error) {
    console.error("Error during admin register:", error);
    res.status(500).json({
      message: error.message || "An unknown error occurred",
    });
  }
};
