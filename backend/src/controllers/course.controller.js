import { Course } from "../models/course.model.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const newCourse = new Course({ name });
    const savedCourse = await newCourse.save();
    res.status(201).json({ success: true, data: savedCourse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCourse)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// // Delete a course
// export const deleteCourse = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCourse = await Course.findByIdAndDelete(id);
//     if (!deletedCourse)
//       return res
//         .status(404)
//         .json({ success: false, message: "Course not found" });
//     res.status(200).json({ success: true, message: "Course deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// Delete a course and remove references from employees
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Use the static method to delete the course and update employees
    await Course.deleteCourseAndUpdateEmployees(id);

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
