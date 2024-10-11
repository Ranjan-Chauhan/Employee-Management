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

  useEffect(() => {
    setErrors({});
    setSubmitError("");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (type === "file" && files[0]) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      // else if (type === "file") {
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     [name]: e.target.files[0],
      //   }));
      // } else {
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     [name]: value,
      //   }));
      // }

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Convert the image file to a base64 string for preview
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
    setLoading(true); // Set loading to true when starting submission

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
      setLoading(false); // Set loading to false on validation error
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("course", formData.course.join(",")); // Join array into comma-separated string
    formDataToSend.append("profileImage", formData.profileImage);

    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch("http://localhost:8000/api/employees", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      setLoading(false); // Set loading to false after request completes
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
              disabled={loading} // Disable input while loading
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
              disabled={loading} // Disable input while loading
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
              disabled={loading} // Disable input while loading
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
              disabled={loading} // Disable dropdown while loading
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
                  disabled={loading} // Disable radio buttons while loading
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
                  disabled={loading} // Disable radio buttons while loading
                />{" "}
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs italic">{errors.gender}</p>
            )}
          </div>

          {/* Course Checkboxes */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Course
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value="B.Tech"
                  checked={formData.course.includes("B.Tech")}
                  onChange={handleChange}
                  disabled={loading} // Disable checkboxes while loading
                />{" "}
                B.Tech
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={formData.course.includes("BCA")}
                  onChange={handleChange}
                  disabled={loading} // Disable checkboxes while loading
                />{" "}
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={formData.course.includes("MCA")}
                  onChange={handleChange}
                  disabled={loading} // Disable checkboxes while loading
                />{" "}
                MCA
              </label>
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
              accept=".jpeg,.png"
              onChange={handleChange}
              disabled={loading} // Disable input while loading
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-20 h-20 object-cover rounded m-2  border-2 shadow-md hover:border-purple-600 "
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Employee"}
            </button>
          </div>
          {submitError && (
            <p className="text-red-500 text-xs italic">{submitError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
