import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const ApplayoutTopShell = ({ toggleSidebar }) => {

  const user = useSelector((state) => state.user);

  return (
    <div className="applayout-top-shell">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <p className="logo">
          <img src="/sina-quotes-logo.svg" alt="Sina Quotes Logo" className="logo-icon" />
          SINA Quotes
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
