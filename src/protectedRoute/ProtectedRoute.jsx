import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/userSlice";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}verify`, { withCredentials: true })
      .then((response) => {
        // Dispatch the verified user details to Redux to populate it on browser reload
        dispatch(setUser(response.data.user));
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, [dispatch, API_BASE_URL]);

  if (isAuthenticated === null) return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", fontStyle: "italic", color: "var(--t-muted)" }}>Loading SINA ecosystem session...</div>;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
