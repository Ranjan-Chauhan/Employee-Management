// import React, { useContext, useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [loggedInUser, setLoggedInUser] = useState("");

//   const handleLogout = () => {
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem("loggedInUser"));
//   }, []);

//   return (
//     <header className="bg-blue-300 p-4 flex justify-between items-center">
//       <div className="flex space-x-28 ">
//         <Link to="/Dashboard" className="flex items-center font-semibold">
//           <img src="" className="" alt="Logo" />
//         </Link>

//         <Link to="/Dashboard" className="hover:underline font-semibold ">
//           Home
//         </Link>

//         <Link to="/EmployeeList" className="hover:underline font-semibold">
//           Employee List
//         </Link>
//       </div>
//       <div className="flex space-x-24 items-center px-10">
//         <span className="font-semibold  p-2  rounded-md px-8">
//           User: {loggedInUser.length !== 0 && loggedInUser.toUpperCase()}
//         </span>
//         <button onClick={handleLogout}>
//           <Link
//             to="/login"
//             className="text-gray-800 shadow-lg hover:bg-red-400 font-semibold rounded-lg px-8 p-2"
//           >
//             Log Out
//           </Link>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

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
    <header className="bg-blue-300 px-6 py-1 flex justify-between items-center">
      <div className="flex pl-5">
        <Link to="/Dashboard" className="flex items-center font-semibold ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRln9L-Mr039zwxerF3U9Rrw1Z16abkfSERyA&s"
            className="w-14 h-14 rounded-full"
            alt="Logo"
          />
        </Link>
        <div className="flex space-x-16 items-center px-10">
          <Link to="/Dashboard" className="hover:underline font-semibold">
            Home
          </Link>

          <Link to="/EmployeeList" className="hover:underline font-semibold">
            Employee List
          </Link>
        </div>
      </div>
      <div className="flex space-x-16 items-center pr-10">
        <span className="font-semibold py-1 px-3 rounded shadow-l hover:bg-purple-400">
          Admin-{loggedInUser ? loggedInUser.toUpperCase() : "Not Logged In"}
        </span>
        <button onClick={handleLogout}>
          <Link
            to="/login"
            className="hover:bg-red-500 hover:text-white font-semibold rounded px-3 py-1"
          >
            LOG OUT
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
