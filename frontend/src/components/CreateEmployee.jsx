// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const CreateEmployee = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     designation: "",
//     gender: "",
//     course: [],
//     profileImage: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [submitError, setSubmitError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setErrors({});
//     setSubmitError("");
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: checked
//           ? [...prevData[name], value]
//           : prevData[name].filter((item) => item !== value),
//       }));
//     } else if (type === "file" && files[0]) {
//       const file = files[0];
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: file,
//       }));
//       // else if (type === "file") {
//       //   setFormData((prevData) => ({
//       //     ...prevData,
//       //     [name]: e.target.files[0],
//       //   }));
//       // } else {
//       //   setFormData((prevData) => ({
//       //     ...prevData,
//       //     [name]: value,
//       //   }));
//       // }

//       // Preview the image
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Set the preview URL
//       };
//       reader.readAsDataURL(file); // Convert the image file to a base64 string for preview
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setSubmitError("");
//     setLoading(true); // Set loading to true when starting submission

//     let formErrors = {};
//     if (!formData.name) formErrors.name = "Name is required";
//     if (!formData.email) formErrors.email = "Email is required";
//     if (!formData.phone) formErrors.phone = "Phone is required";
//     if (!formData.designation)
//       formErrors.designation = "Designation is required";
//     if (!formData.gender) formErrors.gender = "Gender is required";
//     if (formData.course.length === 0)
//       formErrors.course = "At least one course must be selected";

//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       setLoading(false); // Set loading to false on validation error
//       return;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("email", formData.email);
//     formDataToSend.append("phone", formData.phone);
//     formDataToSend.append("designation", formData.designation);
//     formDataToSend.append("gender", formData.gender);
//     formDataToSend.append("course", formData.course.join(",")); // Join array into comma-separated string
//     formDataToSend.append("profileImage", formData.profileImage);

//     const token = localStorage.getItem("jwtToken");
//     try {
//       const response = await fetch("http://localhost:8000/api/employees", {
//         method: "POST",
//         body: formDataToSend,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         navigate("/EmployeeList");
//       } else {
//         const result = await response.json();
//         setSubmitError(result.message || "Error creating employee");
//       }
//     } catch (error) {
//       console.error("Error during employee creation:", error);
//       setSubmitError("Server error");
//     } finally {
//       setLoading(false); // Set loading to false after request completes
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="bg-yellow-300 text-black font-bold py-1.5 px-6">
//         Create Employee
//       </div>
//       <div className="flex justify-center items-center pt-9">
//         <form
//           className="bg-white shadow-md rounded px-8 pb-5"
//           onSubmit={handleSubmit}
//         >
//           {/* Name Input */}
//           <div className="mb-2 pt-4">
//             <label
//               htmlFor="name"
//               className="block text-gray-700 text-sm font-semibold mb-1"
//             >
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               disabled={loading} // Disable input while loading
//               className={`shadow appearance-none border ${
//                 errors.name ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs italic">{errors.name}</p>
//             )}
//           </div>

//           {/* Email Input */}
//           <div className="mb-2">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 text-sm font-semibold mb-1"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               disabled={loading} // Disable input while loading
//               className={`shadow appearance-none border ${
//                 errors.email ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs italic">{errors.email}</p>
//             )}
//           </div>

//           {/* Phone Input */}
//           <div className="mb-2">
//             <label
//               htmlFor="phone"
//               className="block text-gray-700 text-sm font-semibold mb-1"
//             >
//               Phone No
//             </label>
//             <input
//               id="phone"
//               name="phone"
//               type="text"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={loading} // Disable input while loading
//               className={`shadow appearance-none border ${
//                 errors.phone ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs italic">{errors.phone}</p>
//             )}
//           </div>

//           {/* Designation Dropdown */}
//           <div className="mb-2">
//             <label
//               htmlFor="designation"
//               className="block text-gray-700 text-sm font-bold mb-1"
//             >
//               Designation
//             </label>
//             <select
//               id="designation"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               disabled={loading} // Disable dropdown while loading
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="">Select</option>
//               <option value="HR">HR</option>
//               <option value="Manager">Manager</option>
//               <option value="Sales">Sales</option>
//             </select>
//             {errors.designation && (
//               <p className="text-red-500 text-xs italic">
//                 {errors.designation}
//               </p>
//             )}
//           </div>

//           {/* Gender Radio Buttons */}
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-bold mb-1">
//               Gender
//             </label>
//             <div className="flex">
//               <label className="mr-4">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Male"
//                   checked={formData.gender === "Male"}
//                   onChange={handleChange}
//                   disabled={loading} // Disable radio buttons while loading
//                 />{" "}
//                 Male
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Female"
//                   checked={formData.gender === "Female"}
//                   onChange={handleChange}
//                   disabled={loading} // Disable radio buttons while loading
//                 />{" "}
//                 Female
//               </label>
//             </div>
//             {errors.gender && (
//               <p className="text-red-500 text-xs italic">{errors.gender}</p>
//             )}
//           </div>

//           {/* Course Checkboxes */}
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-bold mb-1">
//               Course
//             </label>
//             <div className="flex">
//               <label className="mr-4">
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="B.Tech"
//                   checked={formData.course.includes("B.Tech")}
//                   onChange={handleChange}
//                   disabled={loading} // Disable checkboxes while loading
//                 />{" "}
//                 B.Tech
//               </label>
//               <label className="mr-4">
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="BCA"
//                   checked={formData.course.includes("BCA")}
//                   onChange={handleChange}
//                   disabled={loading} // Disable checkboxes while loading
//                 />{" "}
//                 BCA
//               </label>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="MCA"
//                   checked={formData.course.includes("MCA")}
//                   onChange={handleChange}
//                   disabled={loading} // Disable checkboxes while loading
//                 />{" "}
//                 MCA
//               </label>
//             </div>
//             {errors.course && (
//               <p className="text-red-500 text-xs italic">{errors.course}</p>
//             )}
//           </div>

//           {/* Profile Image Input */}
//           <div className="mb-2">
//             <label
//               htmlFor="profileImage"
//               className="block text-gray-700 text-sm font-bold mb-1"
//             >
//               Profile Image
//             </label>
//             <input
//               id="profileImage"
//               name="profileImage"
//               type="file"
//               accept=".jpeg,.png"
//               onChange={handleChange}
//               disabled={loading} // Disable input while loading
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Profile Preview"
//                 className="w-20 h-20 object-cover rounded m-2  border-2 shadow-md hover:border-purple-600 "
//               />
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-between mt-4">
//             <button
//               type="submit"
//               disabled={loading} // Disable button while loading
//               className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                 loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? "Creating..." : "Create Employee"}
//             </button>
//           </div>
//           {submitError && (
//             <p className="text-red-500 text-xs italic">{submitError}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateEmployee;
/*..........................................*/

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Mastercourse from "./Mastercourse";

// const CreateEmployee = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     designation: "",
//     gender: "",
//     course: [],
//     profileImage: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [submitError, setSubmitError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const navigate = useNavigate();

//   // Clear errors on mount
//   useEffect(() => {
//     setErrors({});
//     setSubmitError("");
//   }, []);

//   // Function to handle course selection from Mastercourse
//   const handleSelectCourses = (selectedCourses) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       course: selectedCourses, // Update formData course field
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: checked
//           ? [...prevData[name], value]
//           : prevData[name].filter((item) => item !== value),
//       }));
//     } else if (type === "file" && files[0]) {
//       const file = files[0];
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: file,
//       }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setSubmitError("");
//     setLoading(true);

//     let formErrors = {};
//     if (!formData.name) formErrors.name = "Name is required";
//     if (!formData.email) formErrors.email = "Email is required";
//     if (!formData.phone) formErrors.phone = "Phone is required";
//     if (!formData.designation)
//       formErrors.designation = "Designation is required";
//     if (!formData.gender) formErrors.gender = "Gender is required";
//     if (formData.course.length === 0)
//       formErrors.course = "At least one course must be selected";

//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       setLoading(false);
//       return;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("email", formData.email);
//     formDataToSend.append("phone", formData.phone);
//     formDataToSend.append("designation", formData.designation);
//     formDataToSend.append("gender", formData.gender);
//     formDataToSend.append("course", formData.course.join(",")); // Join array into comma-separated string
//     formDataToSend.append("profileImage", formData.profileImage);

//     const token = localStorage.getItem("jwtToken");
//     try {
//       const response = await fetch("http://localhost:8000/api/employees", {
//         method: "POST",
//         body: formDataToSend,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         navigate("/EmployeeList");
//       } else {
//         const result = await response.json();
//         setSubmitError(result.message || "Error creating employee");
//       }
//     } catch (error) {
//       console.error("Error during employee creation:", error);
//       setSubmitError("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="bg-yellow-300 text-black font-bold py-1.5 px-6">
//         Create Employee
//       </div>
//       <div className="flex justify-center items-center pt-9">
//         <form
//           className="bg-white shadow-md rounded px-8 pb-5"
//           onSubmit={handleSubmit}
//         >
//           {/* Name Input */}
//           <div className="mb-2 pt-4">
//             <label
//               htmlFor="name"
//               className="block text-gray-700 text-sm font-semibold mb-1"
//             >
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               disabled={loading} // Disable input while loading
//               className={`shadow appearance-none border ${
//                 errors.name ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs italic">{errors.name}</p>
//             )}
//           </div>
//           {/* Email Input */}
//           <div className="mb-2">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 text-sm font-semibold mb-1"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               disabled={loading} // Disable input while loading
//               className={`shadow appearance-none border ${
//                 errors.email ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs italic">{errors.email}</p>
//             )}
//           </div>
//           {/* Phone Input */}
//           <div className="mb-2">
//             <label
//               htmlFor="phone"
//               className="block text-gray-700 text-sm font-semibold mb-1"
//             >
//               Phone No
//             </label>
//             <input
//               id="phone"
//               name="phone"
//               type="text"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={loading} // Disable input while loading
//               className={`shadow appearance-none border ${
//                 errors.phone ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs italic">{errors.phone}</p>
//             )}
//           </div>
//           {/* Designation Dropdown */}
//           <div className="mb-2">
//             <label
//               htmlFor="designation"
//               className="block text-gray-700 text-sm font-bold mb-1"
//             >
//               Designation
//             </label>
//             <select
//               id="designation"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               disabled={loading} // Disable dropdown while loading
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="">Select</option>
//               <option value="HR">HR</option>
//               <option value="Manager">Manager</option>
//               <option value="Sales">Sales</option>
//             </select>
//             {errors.designation && (
//               <p className="text-red-500 text-xs italic">
//                 {errors.designation}
//               </p>
//             )}
//           </div>
//           {/* Gender Radio Buttons */}
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-bold mb-1">
//               Gender
//             </label>
//             <div className="flex">
//               <label className="mr-4">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Male"
//                   checked={formData.gender === "Male"}
//                   onChange={handleChange}
//                   disabled={loading} // Disable radio buttons while loading
//                 />{" "}
//                 Male
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Female"
//                   checked={formData.gender === "Female"}
//                   onChange={handleChange}
//                   disabled={loading} // Disable radio buttons while loading
//                 />{" "}
//                 Female
//               </label>
//             </div>
//             {errors.gender && (
//               <p className="text-red-500 text-xs italic">{errors.gender}</p>
//             )}
//           </div>
//           {/* Mastercourse Component */}
//           <div className="mb-2">
//             {/* <Mastercourse onSelectCourses={handleSelectCourses} /> */}
//             {errors.course && <p>{errors.course}</p>}
//           </div>
//           {/* Submit Button */}
//           <div>
//             <button type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Employee"}
//             </button>
//           </div>
//           {submitError && <p>{submitError}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateEmployee;
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
    course: [], // Storing course IDs as an array
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
        const response = await fetch("http://localhost:8000/api/courses");
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
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
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
