import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import axios from "axios";

const AlreadyLoggedInRedirect = ({ children }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}verify`, {
          withCredentials: true, 
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) return <p>Loading...</p>;

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || "/dashboard"} replace />;
  }

  return children; 
};

export default AlreadyLoggedInRedirect;
