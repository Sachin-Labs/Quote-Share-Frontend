import React, { useState } from "react";
import AppLayoutSideShell from "../components/AppLayoutSideShell";
import AppLayoutTopShell from "../components/AppLayoutTopShell";

import "../styles/applayout.css";

const AppShell = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="applayout">
      <AppLayoutTopShell toggleSidebar={toggleSidebar} />
      <div className="applayout-content">
        <AppLayoutSideShell isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div 
          className="children-container" 
          onClick={closeSidebar}
        >
          { children }
        </div>
      </div>
    </div>
  );
};

export default AppShell;
