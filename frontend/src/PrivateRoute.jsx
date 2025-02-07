import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("jwtToken");

  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
