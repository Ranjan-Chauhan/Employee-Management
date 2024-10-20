import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  return (
    <header className="bg-blue-300 px-6 py-2 flex justify-between items-center">
      <div className="flex pl-5">
        <Link to="/Dashboard" className="flex items-center font-semibold ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRln9L-Mr039zwxerF3U9Rrw1Z16abkfSERyA&s"
            className="w-14 h-14 rounded-full"
            alt="Logo"
          />
        </Link>
        <div className="flex space-x-16 items-center px-10">
          <Link
            to="/Dashboard"
            className="hover:underline hover:text-pink-600 hover:font-bold font-semibold"
          >
            Home
          </Link>

          <Link
            to="/EmployeeList"
            className="hover:underline hover:text-pink-600 hover:font-bold  font-semibold"
          >
            Employee List
          </Link>
          <Link
            to="/Mastercourse"
            className="hover:underline hover:text-pink-600 hover:font-bold   font-semibold"
          >
            Course List
          </Link>
        </div>
      </div>
      <div className="flex space-x-16 items-center pr-10">
        <span className="font-semibold py-1 px-3 rounded shadow-l hover:text-pink-600 hover:font-bold ">
          Hello - {loggedInUser ? loggedInUser.toUpperCase() : "Not Logged In"}
        </span>
        <button onClick={handleLogout}>
          <Link
            to="/login"
            className="hover:bg-red-600 hover:text-white font-semibold rounded px-4 py-1"
          >
            LOG OUT
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
