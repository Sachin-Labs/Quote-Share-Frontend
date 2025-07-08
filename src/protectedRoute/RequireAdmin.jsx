import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}verify`, {
          withCredentials: true,
        });
        if (res.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>;

  if (!isAdmin) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
