import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppLayoutSideShell = () => {
  const isAdmin = useSelector((state) => state.user?.user?.role === "admin");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios(`${API_BASE_URL}logout`, { withCredentials: true });
      navigate("/auth");
    } catch (e) {
      // console.log(e.message);
      alert("Something went error")
    }
  };

  return (
    <div className="applayout-side-shell">
      <div className="applayout-nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/quotes"
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          Quotes
        </NavLink>

        <NavLink
          to="/story"
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          Story
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          Settings
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "applayout-link active" : "applayout-link"
            }
          >
            Admin
          </NavLink>
        )}
      </div>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AppLayoutSideShell;
