import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "hukum",
      email: "hcgupta@cstech.in",
      mobile: "954010044",
      designation: "HR",
      gender: "Male",
      course: "MCA",
      createDate: "13-Feb-21",
    },
    {
      id: 2,
      name: "manish",
      email: "manish@cstech.in",
      mobile: "954010033",
      designation: "Sales",
      gender: "Male",
      course: "BCA",
      createDate: "12-Feb-21",
    },
    {
      id: 3,
      name: "yash",
      email: "yash@cstech.in",
      mobile: "954010022",
      designation: "Manager",
      gender: "Male",
      course: "BSC",
      createDate: "11-Feb-21",
    },
    {
      id: 4,
      name: "abhishek",
      email: "abhishek@cstech.in",
      mobile: "954010033",
      designation: "HR",
      gender: "Male",
      course: "MCA",
      createDate: "13-Feb-21",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  // Function to handle adding a new employee
  const createEmployee = () => {
    navigate("/CreateEmployee");
  };
  const editEmployee = () => {
    navigate("/EditEmployee");
  };

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto ">
        <div className="bg-yellow-300 text-black font-bold p-2 mb-4">
          Employee List
        </div>
        <div className="mb-4 p-4">
          <div className="flex justify-end items-center space-x-8 mr-8">
            <div className="">Total Count: {filteredEmployees.length}</div>
            <button
              onClick={createEmployee}
              className="bg-green-500 text-white py-1 px-4 rounded"
            >
              Create Employee
            </button>
          </div>
          <div className="flex justify-end items-end space-y-2 space-x-10 mr-7">
            <p className="text-lg">Search</p>
            <input
              type="text"
              placeholder="Enter Search Keyword"
              className="ml-4 p-1 border border-black rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-blue-200 text-left">
                <th className="px-4 py-2">Unique Id</th>
                <th className="px-4 py-2 ">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Mobile No</th>
                <th className="px-4 py-2">Designation</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Create date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-4 py-2">{employee.id}</td>
                  <td className="px-4 py-2">
                    <img
                      src="/path/to/image-placeholder.png"
                      alt="Profile"
                      className="h-12 w-12 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee.mobile}</td>
                  <td className="px-4 py-2">{employee.designation}</td>
                  <td className="px-4 py-2">{employee.gender}</td>
                  <td className="px-4 py-2">{employee.course}</td>
                  <td className="px-4 py-2">{employee.createDate}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={editEmployee}
                    >
                      Edit
                    </button>
                    <button className="text-red-500">Delete</button>
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
