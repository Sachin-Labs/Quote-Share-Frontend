import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { Grid2X2, ScrollText, Sliders, Fingerprint, LogOut, X } from "lucide-react";
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
          <img src="/sina-quotes-logo.svg" alt="Sina Quotes Logo" className="logo-icon" />
          SINA Quotes
        </p>
        <button className="close-sidebar" onClick={onClose}>
          <X size={20} />
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
          <Grid2X2 className="nav-icon" size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/quotes"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          <ScrollText className="nav-icon" size={18} />
          <span>Write Quote</span>
        </NavLink>

        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? "applayout-link active" : "applayout-link"
          }
        >
          <Sliders className="nav-icon" size={18} />
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
            <Fingerprint className="nav-icon" size={18} />
            <span>Review Queue</span>
          </NavLink>
        )}
      </div>
      <button className="logout-button" onClick={logout}>
        <LogOut className="nav-icon" size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AppLayoutSideShell;
