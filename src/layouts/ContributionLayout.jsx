import React from "react";
import TopNavbar from "../components/TopNavbar";
import Contributions from "../pages/Contributions";
import BottomNavbar from "../components/BottomNavbar";

const ContributionLayout = () => {
  return (
    <div>
      <TopNavbar />
      <Contributions />
      <BottomNavbar />
    </div>
  );
};

export default ContributionLayout;
