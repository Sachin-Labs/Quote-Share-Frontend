import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}verify`, { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);
  

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;


