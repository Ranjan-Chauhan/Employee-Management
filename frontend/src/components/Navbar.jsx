import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  return (
    <header className="bg-blue-300 p-4 flex justify-between items-center">
      <div className="flex space-x-28 ">
        <Link to="/Dashboard" className="flex items-center font-semibold">
          <img src="" className="" alt="Logo" />
        </Link>

        <Link to="/Dashboard" className="hover:underline font-semibold ">
          Home
        </Link>

        <Link to="/EmployeeList" className="hover:underline font-semibold">
          Employee List
        </Link>
      </div>
      <div className="flex space-x-24 items-center px-10">
        <span className="font-semibold shadow-lg p-2 hover:bg-gray-100 rounded-md px-8">
          {loggedInUser ? loggedInUser.username : "Guest"}
        </span>
        <Link
          to="/login"
          className="text-gray-800 shadow-lg hover:bg-red-400 font-semibold rounded-lg px-8 p-2"
        >
          Log Out
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
