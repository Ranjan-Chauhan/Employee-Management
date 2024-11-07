import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employee } = state || {};

  const [formData, setFormData] = useState({
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    designation: employee?.designation || "",
    gender: employee?.gender || "",
    course: employee?.course ? employee.course.map((c) => c) : [],
    profileImage: employee?.profileImage || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    employee?.profileImage || ""
  );
  const [courseList, setCourseList] = useState([]); // To store fetched courses

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/courses"); // Replace with your API URL
        const data = await response.json();
        setCourseList(data.data || []); // Assuming data.data contains the list of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedCourses = checked
          ? [...new Set([...prevData.course, value])] // Add selected course ID
          : prevData.course.filter((courseId) => courseId !== value); // Remove unselected course

        return { ...prevData, course: updatedCourses };
      });
    } else if (type === "file") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));

      // Update image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email.trim()) formErrors.email = "Email is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    const phonePattern = /^\d{10}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      formErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.gender) formErrors.gender = "Gender is required";

    if (formData.course.length === 0)
      formErrors.course = "At least one course must be selected";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("course", [...new Set(formData.course)].join(",")); // Comma-separated course IDs

    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/employees/${employee._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        // console.log("Employee updated successfully");
        navigate("/EmployeeList");
      } else {
        const errorData = await response.json();
        console.error("Error updating employee", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="bg-yellow-300 text-black font-semibold py-1.5 px-6">
        Edit Employee
      </h1>
      <div className="flex justify-center items-center pt-9">
        <form
          className="bg-white shadow-md rounded px-8 pb-5"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="pt-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Name
            </label>
            <input
              className={`shadow appearance-none border ${
                errors.name ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Email
            </label>
            <input
              className={`shadow appearance-none border ${
                errors.email ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Phone No
            </label>
            <input
              className={`shadow appearance-none border ${
                errors.phone ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>

          {/* Designation */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Designation
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender */}
          <div className="mb-1.5">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Gender
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />{" "}
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs italic">{errors.gender}</p>
            )}
          </div>

          {/* Courses */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Courses
            </label>
            <div className="flex flex-wrap">
              {courseList.length > 0 ? (
                courseList.map((course) => (
                  <label key={course._id} className="mx-1">
                    <input
                      type="checkbox"
                      name="course"
                      value={course._id} // Use course ID
                      checked={formData.course.includes(course._id)} // Check if employee's course list includes the course ID
                      onChange={handleChange}
                    />{" "}
                    {course.name}
                  </label>
                ))
              ) : (
                <p>No courses available</p>
              )}
            </div>
            {errors.course && (
              <p className="text-red-500 text-xs italic">{errors.course}</p>
            )}
          </div>

          {/* Image Upload and Preview */}
          <div className="mb-2">
            <label
              htmlFor="profileImage"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Profile Image
            </label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              accept=".jpeg,.png"
              onChange={handleChange}
              disabled={loading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="mt-2 h-20 w-20 rounded-full"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
