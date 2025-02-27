import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Mastercourse = () => {
  const [courseList, setCourseList] = useState([]);
  const [courses, setCourses] = useState({ course: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  // Fetch all courses from the backend on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/courses`);
      setCourseList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCourses({ ...courses, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // If editing, update the existing course
      try {
        const response = await axios.put(`${baseUrl}/api/courses/${editId}`, {
          name: courses.course,
        });
        const updatedCourses = courseList.map((course, index) =>
          index === editIndex ? response.data.data : course
        );
        setCourseList(updatedCourses);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating courses:", error);
      }
    } else {
      // If not editing, add a new course
      try {
        const response = await axios.post(`${baseUrl}/api/courses`, {
          name: courses.course,
        });
        setCourseList([...courseList, response.data.data]);
      } catch (error) {
        console.error("Error adding course:", error);
      }
    }
    setCourses({ course: "" });
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditId(courseList[index]._id); // Store the ID of the course being edited
    setCourses({ course: courseList[index].name }); // Populate the input with course name
  };

  const handleDelete = async (index) => {
    try {
      const courseId = courseList[index]._id;
      await axios.delete(`${baseUrl}/api/courses/${courseId}`);
      setCourseList(courseList.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-yellow-300 text-black font-bold py-1.5 px-6">
        Master Course
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center justify-center m-10"
      >
        <input
          id="course"
          name="course"
          required
          type="text"
          value={courses.course}
          onChange={handleInputs}
          className="shadow-md appearance-none border px-3 py-1 hover:border-black rounded focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className={`${
            isEditing ? "bg-green-400 shadow-md rounded" : "bg-blue-400"
          } py-1 px-3 m-2 shadow-md rounded`}
        >
          {isEditing ? "Save Changes" : "Add Course"}
        </button>
      </form>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-7">
        <table className="w-10/12 divide-y divide-gray-200 border shadow-md ">
          <thead className="bg-blue-200 font-semibold rounded-t">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Unique Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Create Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courseList && courseList.length > 0 ? (
              courseList.map((course, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(course.createdate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 py-1 px-3 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-400 py-1 px-3 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mastercourse;
