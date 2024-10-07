import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import Navbar from "./Navbar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  // const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Store JWT in local storage
        localStorage.setItem("jwtToken", data.jwtToken);
        localStorage.setItem("loggedInUser", data.admin.username);
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Invalid login details");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <>
      <div>
        <div className="flex p-2 px-9  bg-blue-300 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRln9L-Mr039zwxerF3U9Rrw1Z16abkfSERyA&s"
            className="w-14 h-14 rounded-full"
            alt="Logo"
          />
        </div>
        <div className="bg-yellow-300 text-black font-bold p-2 px-6 mb-4">
          Login Page
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
          <div className="mx-auto w-full max-w-sm">
            <form className="space-y-2" onSubmit={handleSubmit}>
              {" "}
              {/* <-- Add onSubmit handler */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email} // Bind value to formData state
                    onChange={handleChange} // Add onChange handler
                    className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password} // Bind value to formData state
                    onChange={handleChange} // Add onChange handler
                    className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-lg font-semibold text-white shadow-sm"
                >
                  Login
                </button>
              </div>
            </form>

            {message && ( // Display message if exists
              <p className="mt-4 text-center text-sm text-gray-500">
                {message}
              </p>
            )}

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/Singup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Please Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
