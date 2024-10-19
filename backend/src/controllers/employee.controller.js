// import { upload } from "../middlewares/multer.middleware.js";
// // import { Employee } from "../models/employee.model.js";
// // import { uploadOnCloudinary } from "../utils/cloudinary.js";

// // // Create Employee
// // export const createEmployee = async (req, res) => {
// //   try {
// //     // console.log(req?.body);
// //     const uploadfile = req.file;
// //     const profileImageLocalPath = req.file?.path;

// //     console.log(profileImageLocalPath);
// //     const response = await uploadOnCloudinary(profileImageLocalPath);
// //     const profileImage = profileImageLocalPath.url;
// //     // console.log(profileImage);

// //     // const newEmployee = new Employee(req.body);
// //     const newEmployee = new Employee({
// //       ...req.body,
// //       profileImage,
// //     });

// //     await newEmployee.save();
// //     res.status(201).json({
// //       message: "Employee created successfully",
// //       employee: newEmployee,
// //     });
// //   } catch (error) {
// //     console.error("Error creating employee:", error);
// //     res.status(500).json({ message: "Error creating employee", error });
// //   }
// // };
import mongoose from "mongoose";
import { Employee } from "../models/employee.model.js";
import { Course } from "../models/course.model.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, designation, gender, course } = req.body;

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
    const profileImage = req.file
      ? `${req.protocol}://${req.get("host")}/temp/${req.file.filename}`
      : "";

    // Create new employee with the valid course IDs
    const newEmployee = new Employee({
      name,
      email,
      phone,
      designation,
      gender,
      course: courseIds, // Store valid course IDs
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

/*................................*/
// Update employee details
// export const updateEmployee = async (req, res) => {
//   try {
//     const { body, file } = req;

//     let cloudinaryImageUrl = null;

//     // If a file is uploaded, upload it to Cloudinary
//     if (file) {
//       const result = await uploadOnCloudinary(file.path);

//       if (result) {
//         cloudinaryImageUrl = result.secure_url; // Cloudinary URL for the uploaded image
//       } else {
//         return res.status(500).json({ message: "Failed to upload image" });
//       }
//     }

//     // Update the employee data
//     const updatedData = {
//       ...body,
//       ...(cloudinaryImageUrl && { profileImage: cloudinaryImageUrl }), // Only add profileImage if it's available
//     };

//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { $set: updatedData },
//       { new: true, runValidators: true }
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

export const updateEmployee = async (req, res) => {
  try {
    const { body, file } = req;

    let localImagePath = null;

    // If a file is uploaded, save it to the public/temp folder
    if (file) {
      const uploadFolderPath = path.join(__dirname, "../public/temp");

      // Create the folder if it doesn't exist
      if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath, { recursive: true });
      }

      // Generate a unique file name for the uploaded image
      const fileName = `${Date.now()}_${file.originalname}`;
      const filePath = path.join(uploadFolderPath, fileName);

      // Move the uploaded file to the public/temp folder
      fs.renameSync(file.path, filePath);

      // Save the local path for use in the employee document
      localImagePath = `/temp/${fileName}`;
    }

    // Update the employee data, ensuring course is an ObjectId
    const updatedData = {
      ...body,
      course: body.course, // Ensure this is an ObjectId
      ...(localImagePath && { profileImage: localImagePath }),
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
