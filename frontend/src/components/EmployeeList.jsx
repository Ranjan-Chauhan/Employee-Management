// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import EditEmployee from "./EditEmployee";

// const EmployeeList = () => {
//   const navigate = useNavigate();
//   const [employees, setEmployees] = useState([]);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("jwtToken");
//   const [employee, setEmployee] = useState();
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/employees", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setEmployees(data);
//         } else {
//           setError("Failed to fetch employees");
//         }
//       } catch (err) {
//         console.error("Error fetching employees:", err);
//         setError("Server error");
//       }
//     };

//     fetchEmployees();
//   }, [token]);

//   const editEmployee = (employee) => {
//     // Navigate to the EditEmployee component, passing the employee data
//     navigate(`/EditEmployee`, { state: { employee } });
//   };

//   const deleteEmployee = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/employees/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.ok) {
//         setEmployees(employees.filter((employee) => employee._id !== id));
//       } else {
//         setError("Failed to delete employee");
//       }
//     } catch (err) {
//       console.error("Error deleting employee:", err);
//       setError("Server error");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="bg-yellow-300 text-black font-bold p-2 mb-4 text-center">
//         Employee List
//       </div>
//       <div className="flex justify-between px-6 py-2">
//         <div className="flex items-center">
//           <span>Total Count: {employees.length}</span>
//         </div>
//         <button
//           className="bg-green-500 text-white py-1 px-3 rounded"
//           onClick={() => navigate("/CreateEmployee")}
//         >
//           Create Employee
//         </button>
//         <input
//           type="text"
//           placeholder="Enter Search Keyword"
//           className="border border-gray-300 py-1 px-2 rounded"
//         />
//       </div>
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
//         <div className="">
//           {error && <p className="text-red-500 text-xs italic">{error}</p>}
//           <table className="min-w-full divide-y divide-gray-200 border">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Unique Id
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Image
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Phone No
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Designation
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Gender
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Course
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Create Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {employees.map((employee, index) => (
//                 <tr key={employee._id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <img
//                       src={`http://localhost:8000/uploads/${employee.profileImage}`}
//                       alt={employee.name}
//                       className="w-16 h-16 object-cover rounded-full"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {employee.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {employee.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {employee.phone}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {employee.designation}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {employee.gender}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {employee.course}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(employee.createdate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3">
//                     <button
//                       className="bg-sky-600 text-white px-2 py-1 rounded-lg hover:underline"
//                       onClick={() => editEmployee(employee)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 text-white rounded-lg px-2 py-1 hover:underline"
//                       onClick={() => deleteEmployee(employee._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;

/*.....................................................................................*/

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]); // To store filtered employees
  const [searchQuery, setSearchQuery] = useState(""); // To store search input
  const [error, setError] = useState("");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
          setFilteredEmployees(data); // Initially set the filtered employees as all employees
        } else {
          setError("Failed to fetch employees");
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Server error");
      }
    };

    fetchEmployees();
  }, [token]);

  // Function to handle search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    // Filter employees based on the search query
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        employee.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        employee.designation
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );

    setFilteredEmployees(filtered);
  };

  const editEmployee = (employee) => {
    navigate(`/EditEmployee`, { state: { employee } });
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/employees/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== id));
        setFilteredEmployees(
          filteredEmployees.filter((employee) => employee._id !== id)
        );
      } else {
        setError("Failed to delete employee");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError("Server error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-yellow-300 text-black font-bold py-1.5 px-6 text-left">
        Employee List
      </div>
      <div className="flex justify-between content-center items-center px-6 py-2 pt-6">
        <div className="flex items-center">
          <span>Total Count : {filteredEmployees.length}</span>
        </div>
        <button
          className="hover:bg-blue-400 text-black py-1.5 px-6 border font-semibold shadow-lg rounded justify-center items-center"
          onClick={() => navigate("/CreateEmployee")}
        >
          Create Employee
        </button>
        <input
          type="text"
          placeholder="Search for the employee"
          className="border-2 border-gray-300 py-1 px-2 rounded hover:border-blue-500"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-7">
        <div className="">
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Unique Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Phone No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Create Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee, index) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img
                      src={`http://localhost:8000/uploads/${employee.profileImage}`}
                      alt={employee.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(employee.createdate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3">
                    <button
                      className="bg-sky-600 text-white px-2 py-1 rounded-lg hover:underline"
                      onClick={() => editEmployee(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-lg px-2 py-1 hover:underline"
                      onClick={() => deleteEmployee(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
