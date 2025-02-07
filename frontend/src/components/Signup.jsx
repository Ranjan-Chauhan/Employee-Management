import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      const response = await fetch(
        "https://employeemanagementserver-yr1bq7pb.b4a.run/api/admin/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        alert("Signup Successfully, please login !!");
        navigate("/login");
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
      <div className="flex p-2 px-9 bg-blue-300 ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRln9L-Mr039zwxerF3U9Rrw1Z16abkfSERyA&s"
          className="w-14 h-14 rounded-full"
          alt="Logo"
        />
      </div>
      <div className="bg-yellow-300 text-black font-bold p-2 px-6 mb-4">
        Signup Page
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm flex justify-center items-center rounded shadow-lg p-10">
          <div>
            <form className="space-y-1.5 w-80" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded border p-2 text-black shadow-md"
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
                  className="block w-full rounded border p-2 text-black shadow-md"
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
                  className="block w-full rounded border p-2 text-black shadow-md"
                />
              </div>
              <div className="pt-4 flex justify-center items-center">
                <button
                  type="submit"
                  className="flex w-52 justify-center rounded-md bg-green-500 px-3 py-1.5 text-lg font-semibold text-white shadow-md"
                >
                  Singup
                </button>
              </div>
            </form>

            {message && (
              <p className="mt-4 text-center text-sm text-gray-500">
                {message}
              </p>
            )}
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-gray-500">
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
  );
};

export default Signup;
