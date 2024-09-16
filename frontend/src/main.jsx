import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"; // Import Navigate
import App from "./App.jsx";
import "./index.css";
import Dashboard from "./components/Dashboard.jsx";
import Layout from "./Layout.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import CreateEmployee from "./components/CreateEmployee.jsx";
import Login from "./components/Login.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
import Signup from "./components/Singup.jsx";
// import { UserProvider } from "./context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Automatically redirect to /Login when the app starts
      {
        path: "/",
        element: <Navigate to="/Login" replace={true} />, // Redirect to /Login
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "EmployeeList",
        element: <EmployeeList />,
      },
      {
        path: "CreateEmployee",
        element: <CreateEmployee />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "EditEmployee",
        element: <EditEmployee />,
      },
      {
        path: "Singup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
