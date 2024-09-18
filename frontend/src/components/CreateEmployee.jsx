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
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear errors on component mount
    setErrors({});
    setSubmitError("");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
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

    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.phone) formErrors.phone = "phone is required";
    if (!formData.designation)
      formErrors.designation = "Designation is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (formData.course.length === 0)
      formErrors.course = "At least one course must be selected";
    // if (formData.image === null) formErrors.image = "Image is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("course", formData.course.join(","));
    formDataToSend.append("image", formData.image);

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
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-yellow-300 text-black font-bold p-2 mb-4">
        Create Employee
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm">
          <form className="space-y-2" onSubmit={handleSubmit}>
            {/* Form fields */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="designation"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={formData.gender === "M"}
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={formData.gender === "F"}
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs italic">{errors.gender}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Course
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="checkbox"
                    name="course"
                    value="MCA"
                    checked={formData.course.includes("MCA")}
                    onChange={handleChange}
                  />{" "}
                  MCA
                </label>
                <label className="mr-4">
                  <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    checked={formData.course.includes("BCA")}
                    onChange={handleChange}
                  />{" "}
                  BCA
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="course"
                    value="BSC"
                    checked={formData.course.includes("BSC")}
                    onChange={handleChange}
                  />{" "}
                  BSC
                </label>
              </div>
              {errors.course && (
                <p className="text-red-500 text-xs italic">{errors.course}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image Upload
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept=".jpg, .png"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.image && (
                <p className="text-red-500 text-xs italic">{errors.image}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
            {submitError && (
              <p className="text-red-500 text-xs italic">{submitError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
