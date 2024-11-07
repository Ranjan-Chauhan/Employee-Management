import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    course: [],
    profileImage: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://employeemanagementserver-yr1bq7pb.b4a.run/api/courses"
        );
        const data = await response.json();
        setCourseList(data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Clear errors on mount
  useEffect(() => {
    setErrors({});
    setSubmitError("");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          course: [...prevData.course, value], // Add course ID if checked
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          course: prevData.course.filter((item) => item !== value), // Remove course ID if unchecked
        }));
      }
    } else if (type === "file" && files[0]) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");
    setLoading(true);

    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.phone) formErrors.phone = "Phone is required";
    if (!formData.designation)
      formErrors.designation = "Designation is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (formData.course.length === 0)
      formErrors.course = "At least one course must be selected";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("course", JSON.stringify(formData.course)); // Send courses as array of IDs
    formDataToSend.append("profileImage", formData.profileImage);

    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(
        "https://employeemanagementserver-yr1bq7pb.b4a.run/api/employees",
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        navigate("/EmployeeList");
      } else {
        const result = await response.json();
        setSubmitError(result.message || "Error creating employee");
      }
    } catch (error) {
      console.error("Error during employee creation:", error);
      setSubmitError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-yellow-300 text-black font-bold py-1.5 px-6">
        Create Employee
      </div>
      <div className="flex justify-center items-center pt-9">
        <form
          className="bg-white shadow-md rounded px-8 pb-5"
          onSubmit={handleSubmit}
        >
          {/* Name Input */}
          <div className="mb-2 pt-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-semibold mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className={`shadow appearance-none border ${
                errors.name ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={`shadow appearance-none border ${
                errors.email ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-semibold mb-1"
            >
              Phone No
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className={`shadow appearance-none border ${
                errors.phone ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>

          {/* Designation Dropdown */}
          <div className="mb-2">
            <label
              htmlFor="designation"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              disabled={loading}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.designation && (
              <p className="text-red-500 text-xs italic">
                {errors.designation}
              </p>
            )}
          </div>

          {/* Gender Radio Buttons */}
          <div className="mb-2">
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
                  disabled={loading}
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
                  disabled={loading}
                />{" "}
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs italic">{errors.gender}</p>
            )}
          </div>

          {/* Courses Checkboxes */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Courses
            </label>
            <div className="flex flex-wrap">
              {courseList.map((course) => (
                <label key={course._id} className="mr-4">
                  <input
                    type="checkbox"
                    name="course"
                    value={course._id} // Storing course ID
                    checked={formData.course.includes(course._id)}
                    onChange={handleChange}
                    disabled={loading}
                  />{" "}
                  {course.name}
                </label>
              ))}
            </div>
            {errors.course && (
              <p className="text-red-500 text-xs italic">{errors.course}</p>
            )}
          </div>

          {/* Profile Image Input */}
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
              accept=".jpeg,.png,.jpg"
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
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Employee"}
            </button>
          </div>

          {submitError && (
            <p className="text-red-500 text-xs italic mt-3">{submitError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
