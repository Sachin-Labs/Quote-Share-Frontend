import React from "react";
import { NavLink } from "react-router";

const AppLayoutSideShell = () => {
  return (
    <div className="applayout-side-shell">
      <div className="applayout-nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "applayout-link active" : "applayout-link"}>
          Dashboard
        </NavLink>

        <NavLink to="/quotes" className={({ isActive }) => isActive ? "applayout-link active" : "applayout-link"}>
          Quotes
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => isActive ? "applayout-link active" : "applayout-link"}>
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default AppLayoutSideShell;
