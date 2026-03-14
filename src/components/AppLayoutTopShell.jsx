import React from "react";
import { useSelector } from "react-redux";
import { FaBars, FaQuoteLeft } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const ApplayoutTopShell = ({ toggleSidebar }) => {

  const user = useSelector((state) => state.user);

  return (
    <div className="applayout-top-shell">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <p className="logo">
          <FaQuoteLeft className="logo-icon" />
          QuoteShare
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <p className="welcome-text">{`Welcome, ${user?.user?.name ?? 'User'}`}</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ApplayoutTopShell;
