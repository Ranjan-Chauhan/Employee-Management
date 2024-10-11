// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";

// const EditEmployee = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { employee } = state || {};

//   const [formData, setFormData] = useState({
//     name: employee?.name || "",
//     email: employee?.email || "",
//     phone: employee?.phone || "",
//     designation: employee?.designation || "",
//     gender: employee?.gender || "",
//     course: [],
//     // course: Array.isArray(employee?.course) ? employee.course : [],
//     ProfileImage: employee.profileImage || "",
//   });

//   // const [formData, setFormData] = useState({
//   //   name: employee?.name || "",
//   //   email: employee?.email || "",
//   //   phone: employee?.phone || "",
//   //   designation: employee?.designation || "",
//   //   gender: employee?.gender || "",
//   //   course: employee?.course || [], // Convert comma-separated string to array
//   //   image: employee?.image || "",
//   // });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setFormData((prevData) => {
//         const updatedCourses = checked
//           ? [...new Set([...prevData.course, value])]
//           : prevData.course.filter((course) => course !== value);
//         return { ...prevData, course: updatedCourses };
//       });
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const validateForm = () => {
//     let formErrors = {};

//     if (!formData.name.trim()) formErrors.name = "Name is required";
//     if (!formData.email.trim()) formErrors.email = "Email is required";
//     if (!formData.phone) formErrors.phone = "Phone number is required";

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailPattern.test(formData.email)) {
//       formErrors.email = "Invalid email format";
//     }

//     const phonePattern = /^\d{10}$/;
//     if (formData.phone && !phonePattern.test(formData.phone)) {
//       formErrors.phone = "Phone number must be 10 digits";
//     }

//     if (!formData.gender) formErrors.gender = "Gender is required";

//     if (formData.course.length === 0)
//       formErrors.course = "At least one course must be selected";

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     // console.log(employee.course);
//     // console.log(formData.course);

//     const updatedFormData = {
//       ...formData,
//       course: formData.course.join(","),
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/employees/${employee._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//           },
//           body: JSON.stringify(updatedFormData),
//         }
//       );

//       if (response.ok) {
//         console.log("Employee updated successfully");
//         navigate("/EmployeeList");
//       } else {
//         const errorData = await response.json();
//         console.error("Error updating employee", errorData);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <h1 className="bg-yellow-300 text-black font-semibold py-1.5 px-6">
//         Edit Employee
//       </h1>
//       <div className="flex justify-center items-center pt-9 ">
//         <form
//           className="bg-white shadow-md rounded px-8 pb-5 "
//           onSubmit={handleSubmit}
//         >
//           {/* Name */}
//           <div className="mb-2 pt-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Name
//             </label>
//             <input
//               className={`shadow appearance-none border ${
//                 errors.name ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Email
//             </label>
//             <input
//               className={`shadow appearance-none border ${
//                 errors.email ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs italic">{errors.email}</p>
//             )}
//           </div>

//           {/* Phone */}
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Phone No
//             </label>
//             <input
//               className={`shadow appearance-none border ${
//                 errors.phone ? "border-red-500" : ""
//               } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs italic">{errors.phone}</p>
//             )}
//           </div>

//           {/* Designation */}
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Designation
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
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
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Course
//             </label>
//             <div className="flex">
//               {["MCA", "BCA", "BSC"].map((course) => (
//                 <label key={course} className="mr-4">
//                   <input
//                     type="checkbox"
//                     name="course"
//                     value={course}
//                     checked={formData.course.includes(course)}
//                     onChange={handleChange}
//                   />
//                   {course}
//                 </label>
//               ))}
//             </div>
//             {errors.course && (
//               <p className="text-red-500 text-xs italic">{errors.course}</p>
//             )}
//           </div>

//           {/* Image Upload */}
//           <div className="mb-2">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               ProfileImage
//             </label>
//             <input
//               type="file"
//               name="profileImage"
//               accept=".jpeg,.png"
//               onChange={handleChange}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditEmployee;
import React, { useState } from "react";
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
    course: employee?.course ? employee.course.split(",") : [],
    profileImage: employee?.profileImage || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    employee?.profileImage || ""
  );

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedCourses = checked
          ? [...new Set([...prevData.course, value])] // Add selected course
          : prevData.course.filter((course) => course !== value); // Remove unselected course

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

    // Prepare formData for submission
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("course", [...new Set(formData.course)].join(",")); // Comma-separated courses

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
        console.log("Employee updated successfully");
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
            <label className="block text-gray-700 text-sm font-semibold mb-1">
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
            <label className="block text-gray-700 text-sm font-semibold mb-1">
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
            <label className="block text-gray-700 text-sm font-semibold mb-1">
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
            <label className="block text-gray-700 text-sm font-semibold mb-1">
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
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
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

          {/* Course */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Courses
            </label>
            <div className="flex flex-wrap">
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value="B.Tech"
                  checked={formData.course.includes("B.Tech")}
                  onChange={handleChange}
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
                />{" "}
                MCA
              </label>
            </div>
            {errors.course && (
              <p className="text-red-500 text-xs italic">{errors.course}</p>
            )}
          </div>

          {/* Profile Image */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              accept=".jpeg,.png"
              onChange={handleChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-20 h-20 object-cover rounded m-2  border-2 shadow-md hover:border-purple-600 "
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
