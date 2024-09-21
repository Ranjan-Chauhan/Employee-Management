import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        alert("Signup Successfully, please login !!");
        navigate("/Login");
      } else {
        setMessage(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="bg-yellow-300 text-black font-bold p-2 mb-4">
        Signup Page
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm">
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-2 border-black p-2 text-black shadow-sm"
              />
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-lg font-semibold text-white shadow-sm"
              >
                Singup
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-500">{message}</p>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Please Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
