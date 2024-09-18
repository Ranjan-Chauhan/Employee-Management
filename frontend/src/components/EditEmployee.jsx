// import React, { useState } from "react";

// const EditEmployee = ({ employee }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     designation: "",
//     gender: "",
//     course: [],
//     image: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [submittedEmails, setSubmittedEmails] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         course: checked
//           ? [...prevData.course, value]
//           : prevData.course.filter((course) => course !== value),
//       }));
//     } else if (type === "file") {
//       setFormData((prevData) => ({
//         ...prevData,
//         image: files[0],
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const validateForm = () => {
//     let formErrors = {};

//     // Check if name, email, and phone are provided
//     if (!formData.name.trim()) formErrors.name = "Name is required";
//     if (!formData.email.trim()) formErrors.email = "Email is required";
//     if (!formData.phone.trim())
//       formErrors.phone = "phone number is required";

//     // Check email format
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailPattern.test(formData.email)) {
//       formErrors.email = "Invalid email format";
//     }

//     // Check if the email is already submitted
//     if (submittedEmails.includes(formData.email)) {
//       formErrors.email = "Email already exists";
//     }

//     // Check if phone number is numeric
//     const phonePattern = /^\d{10}$/;
//     if (formData.phone && !phonePattern.test(formData.phone)) {
//       formErrors.mobile = "Mobile number must be 10 digits";
//     }

//     // Check if a gender is selected
//     if (!formData.gender) formErrors.gender = "Gender is required";

//     // Check if at least one course is selected
//     if (formData.course.length === 0)
//       formErrors.course = "At least one course must be selected";

//     // Check if image file is of type jpg or png
//     if (
//       formData.image &&
//       !["image/jpeg", "image/png"].includes(formData.image.type)
//     ) {
//       formErrors.image = "Only jpg/png files are allowed";
//     }

//     setErrors(formErrors);

//     // Return true if no errors
//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log("Form Submitted", formData);

//       // Store submitted email to prevent duplicates
//       setSubmittedEmails([...submittedEmails, formData.email]);

//       // Reset form after submission (optional)
//       setFormData({
//         name: "",
//         email: "",
//         mobile: "",
//         designation: "",
//         gender: "",
//         course: [],
//         image: null,
//       });
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <h1 className="bg-yellow-300 text-black font-semibold p-2 px-4 mb-4">
//         Employee Edit
//       </h1>
//       <div className="flex justify-center items-center h-screen">
//         <form
//           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//           onSubmit={handleSubmit}
//         >
//           {/* Name */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="name"
//             >
//               Name
//             </label>
//             <input
//               className={`shadow appearance-none border ${
//                 errors.name ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//               id="name"
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs italic">{errors.name}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               className={`shadow appearance-none border ${
//                 errors.email ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs italic">{errors.email}</p>
//             )}
//           </div>

//           {/* Mobile */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="mobile"
//             >
//               Mobile No
//             </label>
//             <input
//               className={`shadow appearance-none border ${
//                 errors.mobile ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//               id="mobile"
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//             />
//             {errors.mobile && (
//               <p className="text-red-500 text-xs italic">{errors.mobile}</p>
//             )}
//           </div>

//           {/* Designation */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="designation"
//             >
//               Designation
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="designation"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//             >
//               <option value="">Select</option>
//               <option value="HR">HR</option>
//               <option value="Manager">Manager</option>
//               <option value="Sales">Sales</option>
//             </select>
//           </div>

//           {/* Gender */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Gender
//             </label>
//             <div className="flex">
//               <label className="mr-4">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="M"
//                   checked={formData.gender === "M"}
//                   onChange={handleChange}
//                 />{" "}
//                 Male
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="F"
//                   checked={formData.gender === "F"}
//                   onChange={handleChange}
//                 />{" "}
//                 Female
//               </label>
//             </div>
//             {errors.gender && (
//               <p className="text-red-500 text-xs italic">{errors.gender}</p>
//             )}
//           </div>

//           {/* Course */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Course
//             </label>
//             <div className="flex">
//               <label className="mr-4">
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="MCA"
//                   checked={formData.course.includes("MCA")}
//                   onChange={handleChange}
//                 />{" "}
//                 MCA
//               </label>
//               <label className="mr-4">
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="BCA"
//                   checked={formData.course.includes("BCA")}
//                   onChange={handleChange}
//                 />{" "}
//                 BCA
//               </label>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="BSC"
//                   checked={formData.course.includes("BSC")}
//                   onChange={handleChange}
//                 />{" "}
//                 BSC
//               </label>
//             </div>
//             {errors.course && (
//               <p className="text-red-500 text-xs italic">{errors.course}</p>
//             )}
//           </div>

//           {/* Image Upload */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="image"
//             >
//               Image Upload
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="image"
//               type="file"
//               name="image"
//               accept=".jpg, .png"
//               onChange={handleChange}
//             />
//             {errors.image && (
//               <p className="text-red-500 text-xs italic">{errors.image}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditEmployee;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the passed employee data from the location state
  const { employee } = state || {}; // Destructure employee from state

  // Initialize form state with employee details
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    designation: employee?.designation || "",
    gender: employee?.gender || "",
    course: employee?.course || [],
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [submittedEmails, setSubmittedEmails] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Form validation function
  const validateForm = () => {
    let formErrors = {};

    // Check required fields
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email.trim()) formErrors.email = "Email is required";
    if (!formData.phone.trim()) formErrors.phone = "phone number is required";

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    // Duplicate email check
    if (submittedEmails.includes(formData.email)) {
      formErrors.email = "Email already exists";
    }

    // phone number validation
    const phonePattern = /^\d{10}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      formErrors.phone = "phone number must be 10 digits";
    }

    // Gender selection check
    if (!formData.gender) formErrors.gender = "Gender is required";

    // Course selection check
    if (formData.course.length === 0)
      formErrors.course = "At least one course must be selected";

    // Image type validation
    if (
      formData.image &&
      !["image/jpeg", "image/png"].includes(formData.image.type)
    ) {
      formErrors.image = "Only jpg/png files are allowed";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Form submission handler
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     console.log("Form Submitted", formData);

  //     try {
  //       // Send PUT request to update employee details
  //       const response = await fetch(
  //         `http://localhost:8000/api/employees/${employee._id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //           },
  //           body: JSON.stringify(formData),
  //         }
  //       );

  //       if (response.ok) {
  //         console.log("Employee updated successfully");
  //         navigate("/employees"); // Navigate back to employee list
  //       } else {
  //         console.error("Error updating employee");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted", formData);

      try {
        const response = await fetch(
          `http://localhost:8000/api/employees/${employee._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          console.log("Employee updated successfully");
          navigate("/EmployeeList");
        } else {
          const errorData = await response.json(); // Capture error response from server
          console.error("Error updating employee", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="bg-yellow-300 text-black font-semibold p-2 px-4 mb-4">
        Edit Employee
      </h1>
      <div className="flex justify-center items-center h-screen">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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

          {/* phone */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              phone No
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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

          {/* Course */}
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

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.image && (
              <p className="text-red-500 text-xs italic">{errors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
