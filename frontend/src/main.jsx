import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Dashboard from "./components/Dashboard.jsx";
import Layout from "./Layout.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import CreateEmployee from "./components/CreateEmployee.jsx";
import Login from "./components/Login.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
import RefrshHandler from "../RefreshHandler.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Signup from "./components/Singup.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/Login" replace={true} />,
        },
        {
          path: "Dashboard",
          element: (
            <PrivateRoute
              element={<Dashboard />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },
        {
          path: "EmployeeList",
          element: (
            <PrivateRoute
              element={<EmployeeList />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },
        {
          path: "CreateEmployee",
          element: (
            <PrivateRoute
              element={<CreateEmployee />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },
        {
          path: "EditEmployee",
          element: (
            <PrivateRoute
              element={<EditEmployee />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Singup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router}>
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      </RouterProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
