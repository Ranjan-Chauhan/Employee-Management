import { Navigate } from "react-router-dom";

// PrivateRoute component that checks authentication
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/Login" replace />;
};

export default PrivateRoute;
