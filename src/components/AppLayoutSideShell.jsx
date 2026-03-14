import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { FaChartBar, FaQuoteLeft, FaCog, FaUserShield, FaSignOutAlt, FaTimes } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppLayoutSideShell = ({ isOpen, onClose }) => {
  const isAdmin = useSelector((state) => state.user?.user?.role === "admin");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios(`${API_BASE_URL}logout`, { withCredentials: true });
      navigate("/auth");
    } catch (e) {
      alert("Something went wrong with logout");
    }
  };

  return (
    <div className={`applayout-side-shell ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <p className="logo" style={{ margin: 0 }}>
          <FaQuoteLeft className="logo-icon" />
          QuoteShare
        </p>
        <button className="close-sidebar" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="applayout-nav-links">
        <NavLink
          to="/dashboard"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          <FaChartBar className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/quotes"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          <FaQuoteLeft className="nav-icon" />
          <span>Quotes</span>
        </NavLink>

        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "applayout-link active" : "applayout-link"
            }
          >
            <FaUserShield className="nav-icon" />
            <span>Admin Control</span>
          </NavLink>
        )}
      </div>
      <button className="logout-button" onClick={logout}>
        <FaSignOutAlt className="nav-icon" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AppLayoutSideShell;
