import mongoose from "mongoose";
import { Employee } from "../models/employee.model.js";
import { Course } from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, designation, gender, course } = req.body;
    const profileImageLocalPath = req.file?.path;

    // console.log("body", req.body);
    // console.log("file", req.file);

    if (!name || !email || !phone || !designation || !gender || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Parse the course field directly as an array from JSON
    let courseIds;
    try {
      courseIds = JSON.parse(course);
    } catch (error) {
      return res.status(400).json({ message: "Invalid course format" });
    }

    // console.log("Course IDs received:", courseIds);

    // Check if all the provided IDs are valid MongoDB ObjectIds
    const invalidCourses = courseIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );

    if (invalidCourses.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid course IDs provided: ${invalidCourses}` });
    }

    // Find all courses that match the provided IDs
    const foundCourses = await Course.find({ _id: { $in: courseIds } });

    // Check if the found courses match the number of IDs provided
    if (foundCourses.length !== courseIds.length) {
      const missingCourses = courseIds.filter(
        (id) => !foundCourses.find((course) => course._id.toString() === id)
      );
      return res.status(400).json({
        message: `Invalid or missing courses: ${missingCourses}. Please provide valid course IDs.`,
      });
    }

    // Profile image logic
    const response = await uploadOnCloudinary(profileImageLocalPath);
    const profileImage = response.secure_url;

    // const profileImage = req.file
    //   ? `${req.protocol}://${req.get("host")}/temp/${req.file.filename}`
    //   : "";

    // Create new employee with the valid course IDs
    const newEmployee = new Employee({
      name,
      email,
      phone,
      designation,
      gender,
      course: courseIds,
      profileImage,
    });

    await newEmployee.save();

    return res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get All Employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// Get Employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

// Update employee details
export const updateEmployee = async (req, res) => {
  try {
    const { body, file } = req;
    const profileImageLocalPath = req.file?.path;

    // If a file is uploaded, save it to public/temp
    let profileImage = body.profileImage;
    // const serverUrl = "https://employeemanagementserver-yr1bq7pb.b4a.run";

    if (file) {
      // profileImage = `${serverUrl}/temp/${file.filename}`; // Append full URL to the image
      const response = await uploadOnCloudinary(profileImageLocalPath);
      profileImage = response.secure_url;
    }

    // Handle course data: Ensure it's an array of ObjectId references
    let courses = [];
    if (body.course) {
      courses = body.course.split(",");
    }

    // Update the employee data
    const updatedData = {
      ...body,
      profileImage, // Image is either the new file or the existing one with full URL
      course: courses, // Store course IDs as an array
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee", error });
  }
};
