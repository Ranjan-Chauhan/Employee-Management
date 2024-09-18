// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [sortBy, setSortBy] = useState("f_Name");
//   const [order, setOrder] = useState("asc");
//   const limit = 5;

//   // Fetch employees on component load and when search/page/sortBy/order changes
//   useEffect(() => {
//     fetchEmployees();
//   }, [search, page, sortBy, order]);

//   const fetchEmployees = async () => {

//     try {
//       const response = await axios.get("/employees", {
//         params: {
//           page,
//           limit,
//           search,
//           sortBy,
//           order,
//         },
//       });
//       setEmployees(response.data.employees);
//       setTotalCount(response.data.totalCount);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   // Handle sorting
//   const handleSort = (field) => {
//     setOrder(order === "asc" ? "desc" : "asc");
//     setSortBy(field);
//   };

//   // Handle deleting an employee
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await axios.delete(`/employee/${id}`);
//         fetchEmployees(); // Refresh the list after deletion
//       } catch (error) {
//         console.error("Error deleting employee:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Employee List</h1>
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search employees"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       {/* Employee Table */}
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort("f_Id")}>ID</th>
//             <th>Image</th>
//             <th onClick={() => handleSort("f_Name")}>Name</th>
//             <th onClick={() => handleSort("f_Email")}>Email</th>
//             <th onClick={() => handleSort("f_Mobile")}>Mobile No</th>
//             <th>Designation</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         {/* <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.Id}>
//               <td>{employee.Id}</td>
//               <td>
//                 <img src={employee.f_Image} alt={employee.f_Name} width="50" />
//               </td>
//               <td>{employee.Name}</td>
//               <td>{employee.Email}</td>
//               <td>{employee.Mobile}</td>
//               <td>{employee.Designation}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     (window.location.href = `/edit/${employee._id}`)
//                   }
//                 >
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(employee._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>   */}
//       </table>
//       {/* Pagination Controls */}
//       <div>
//         <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//           Previous
//         </button>
//         <span>Page {page}</span>
//         <button
//           onClick={() => setPage(page + 1)}
//           disabled={page * limit >= totalCount}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <h1 className="bg-yellow-300 text-black font-semibold p-2 px-4 mb-4">
        Dashboard
      </h1>
      <div className="space-y-5 ">
        <p className="flex justify-center items-center text-lg mt-16">
          Welcome To Admin Panel
        </p>
        <div className="flex justify-center items-center font-semibold text-lg ">
          <button onClick={() => navigate("/CreateEmployee")}>
            Create Employee
          </button>
          {/* <div className="flex justify-center rounded-md bg-orange-300 text-black px-3 py-1.5 text-sm font-semibold shadow-sm">
            Update Employee
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
