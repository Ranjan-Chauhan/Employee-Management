import { upload } from "../middlewares/multer.middleware.js";
import { Employee } from "../models/employee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    // console.log(req?.body);
    const uploadfile = req.file;
    const profileImageLocalPath = req.file?.path;

    // console.log(profileImageLocalPath)
    const response = await uploadOnCloudinary(profileImageLocalPath);
    const profileImage = response.url;
    // console.log(profileImage);

    // const newEmployee = new Employee(req.body);
    const newEmployee = new Employee({
      ...req.body,
      profileImage,
    });

    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Error creating employee", error });
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

// // update Employee
// export const updateEmployee = async (req, res) => {
//   try {
//     // if (req.body.course) {
//     //   req.body.course = req.body.course
//     //     .split(",")
//     //     .map((course) => course.trim())
//     //     .join(",");
//     // }

//     const { body, file } = req;
//     // const profileImageLocalPath = req.file?.path;
//     // const response = await uploadOnCloudinary(profileImageLocalPath);
//     // const profileImage = response.url;

//     if (file) {
//       body.profileImage = file.path;
//     }

//     // if (Array.isArray(req.body.course)) {
//     //   req.body.course = req.body.course;
//     // }

//     // Find and update the employee
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           ...req.body, // Replace all fields with the incoming data
//           course: req.body.course, // Ensure courses are replaced
//         },
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.status(200).json({
//       message: "Employee updated successfully",
//       employee: updatedEmployee,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating employee", error });
//   }
// };

// Update employee details
export const updateEmployee = async (req, res) => {
  try {
    const { body, file } = req;

    let cloudinaryImageUrl = null;

    // If a file is uploaded, upload it to Cloudinary
    if (file) {
      const result = await uploadOnCloudinary(file.path);

      if (result) {
        cloudinaryImageUrl = result.secure_url; // Cloudinary URL for the uploaded image
      } else {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    // Update the employee data
    const updatedData = {
      ...body,
      ...(cloudinaryImageUrl && { profileImage: cloudinaryImageUrl }), // Only add profileImage if it's available
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
    res.status(500).json({ message: "Error updating employee", error });
  }
};
