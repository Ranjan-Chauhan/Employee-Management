import mongoose, { Schema } from "mongoose";
import { Employee } from "./employee.model.js";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    createdate: {
      type: Date,
      default: new Date(),
    },
  },

  {
    timestamps: true,
  }
);

// // Pre-remove hook to remove course references from employees
// courseSchema.pre("remove", async function (next) {
//   try {
//     // Remove this course ID from all employees
//     await Employee.updateMany(
//       { course: this._id }, // Find employees with this course ID
//       { $pull: { course: this._id } } // Remove the course ID from their courses array
//     );
//     next();
//   } catch (error) {
//     next(error); // Pass any errors to the next middleware
//   }
// });

// Method to delete a course and update employee references
courseSchema.statics.deleteCourseAndUpdateEmployees = async function (
  courseId
) {
  try {
    // Remove course references from employees first
    await Employee.updateMany(
      { course: courseId }, // Find employees with this course ID
      { $pull: { course: courseId } } // Remove the course ID from their courses array
    );

    // Now delete the course
    await this.deleteOne({ _id: courseId });
    // console.log(
    //   "Course deleted successfully and references removed from employees."
    // );
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};

export const Course = mongoose.model("Course", courseSchema);
