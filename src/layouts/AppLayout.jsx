import React from "react";
import AppLayoutSideShell from "../components/AppLayoutSideShell";
import AppLayoutTopShell from "../components/AppLayoutTopShell";

import "../styles/applayout.css";

const AppShell = ({ children }) => {
  return (
    <div className="applayout">
      <AppLayoutTopShell />
      <div className="applayout-content">
        <AppLayoutSideShell />
        <div className="children-container">
          { children }

        </div>
      </div>
    </div>
  );
};

export default AppShell;
