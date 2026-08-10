import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import '../styles/navbar.css';
import ThemeToggle from "./ThemeToggle";
import axios from "axios";

const TopNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}verify`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <nav>
      <a className="logo" href="/">
        <img src="/sina-quotes-logo.svg" alt="Sina Quotes Logo" className="logo-icon" />
        SINA Quotes
      </a>

      <div className="nav-right">
        <ThemeToggle />
        {isAuthenticated ? (
          <Link className="link link-button" to='/dashboard'>Dashboard</Link>
        ) : (
          <>
            <Link className="link" to='/auth' state={{ mode: 'login' }}>Sign In</Link>
            <Link className="link link-button" to='/auth' state={{ mode: 'signup' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
