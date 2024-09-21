import { Employee } from "../models/employee.model.js";

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const uloadfile = req.file;
    // If req.file exists, it should be handled separately
    if (req.file) {
      employeeData.profileImage = req.file.path; // assuming you use multer to upload files
    }

    const newEmployee = new Employee(req.body);
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

// Update Employee
// export const updateEmployee = async (req, res) => {
//   try {
//     // Fetch the current employee details
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Combine current courses with new ones from the request body
//     const existingCourses = employee.course
//       ? employee.course.split(",").map((c) => c.trim())
//       : [];
//     const newCourses = req.body.course
//       ? req.body.course.split(",").map((c) => c.trim())
//       : [];

//     // Create a unique set of courses
//     const updatedCourses = [...new Set([...existingCourses, ...newCourses])];

//     // Update the employee with the combined courses
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body, course: updatedCourses.join(",") }, // Update course as a comma-separated string
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       message: "Employee updated successfully",
//       employee: updatedEmployee,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating employee", error });
//   }
// };

// Update Employee
// export const updateEmployee = async (req, res) => {
//   try {
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       req.body,
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

export const updateEmployee = async (req, res) => {
  try {
    if (req.body.course) {
      // Ensure that the course field is treated as a string
      req.body.course = req.body.course
        .split(",")
        .map((course) => course.trim())
        .join(",");
    }

    // Find and update the employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body, // Replace all fields with the incoming data
          course: req.body.course, // Ensure courses are replaced
        },
      },
      {
        new: true,
        runValidators: true,
      }
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
