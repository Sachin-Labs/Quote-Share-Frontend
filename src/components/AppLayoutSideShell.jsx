import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const AppLayoutSideShell = () => {
  const isAdmin = useSelector((state) => state.user?.user?.role === "admin");

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
    </div>
  );
};

export default AppLayoutSideShell;
