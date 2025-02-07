import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <h1 className="bg-yellow-300 text-black font-semibold py-1.5 px-8">
        Dashboard
      </h1>
      <div className="space-y-5 ">
        <p className="flex justify-center items-center text-lg mt-16">
          Welcome To Admin Panel
        </p>
        <div className="flex justify-center items-center font-semibold  ">
          <button
            onClick={() => navigate("/create-employee")}
            className="border shadow-lg rounded py-1.5 px-5 hover:bg-blue-400"
          >
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
