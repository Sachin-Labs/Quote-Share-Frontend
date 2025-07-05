import React from "react";
import { useSelector } from "react-redux";

const ApplayoutTopShell = () => {

  const user = useSelector((state)=> state.user);

  return (
    <div className="applayout-top-shell">
      <p className="logo">
        <span className="logo-quote">"</span>QuoteShare
      </p>
      <p>{`Welcome ${user?.user?.name ?? 'User'}`}</p>
    </div>
  );
};

export default ApplayoutTopShell;
