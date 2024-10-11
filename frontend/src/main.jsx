import { StrictMode } from "react";
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
import Signup from "./components/Singup.jsx";
// import { UserProvider } from "./context/UserContext";

// import RefrshHandler from './RefrshHandler';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/login" />
//   }

//   <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

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

// import { StrictMode, useState } from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";
// import "./index.css";
// import Dashboard from "./components/Dashboard.jsx";
// import Layout from "./Layout.jsx";
// import EmployeeList from "./components/EmployeeList.jsx";
// import CreateEmployee from "./components/CreateEmployee.jsx";
// import Login from "./components/Login.jsx";
// import EditEmployee from "./components/EditEmployee.jsx";
// import Signup from "./components/Singup.jsx";
// import RefrshHandler from "../RefreshHandler.jsx";
// import PrivateRoute from "./PrivateRoute";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Your router setup, wrapped in RouterProvider
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         {
//           path: "/",
//           element: <Navigate to="/Login" replace={true} />,
//         },
//         {
//           path: "Dashboard",
//           element: (
//             <PrivateRoute
//               element={<Dashboard />}
//               isAuthenticated={isAuthenticated}
//             />
//           ),
//         },
//         {
//           path: "EmployeeList",
//           element: (
//             <PrivateRoute
//               element={<EmployeeList />}
//               isAuthenticated={isAuthenticated}
//             />
//           ),
//         },
//         {
//           path: "CreateEmployee",
//           element: (
//             <PrivateRoute
//               element={<CreateEmployee />}
//               isAuthenticated={isAuthenticated}
//             />
//           ),
//         },
//         {
//           path: "EditEmployee",
//           element: (
//             <PrivateRoute
//               element={<EditEmployee />}
//               isAuthenticated={isAuthenticated}
//             />
//           ),
//         },
//         {
//           path: "Login",
//           element: <Login />,
//         },
//         {
//           path: "Signup",
//           element: <Signup />,
//         },
//       ],
//     },
//   ]);

//   return (
//     <StrictMode>
//       {/* Ensure RefrshHandler runs after RouterProvider */}
//       <RouterProvider router={router}>
//         <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
//       </RouterProvider>
//     </StrictMode>
//   );
// }

// createRoot(document.getElementById("root")).render(<App />);
