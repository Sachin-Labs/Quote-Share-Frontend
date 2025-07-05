import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter} from "react-icons/fa6";
import { Link } from "react-router";

const BottomNavbar = () => {
  return (
    <div className="bottom-container">
      <div className="bottom-first-card">
        <div className="bottom-logo-card">
          <p className="logo"><span className="logo-quote">"</span>QuoteShare</p>
          <p>
            Share inspiration, spread positivity, and motivate others with beautiful quotes.


          </p>
        </div>
        <div className="bottom-first-card-inside-card">
          <div>
            <h4>Company</h4>
            <ul className="bottom-nav-links">
              <li>
                <Link to="/" className="bottom-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="bottom-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="bottom-link">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>Email: support@tech.com</p>
            <ul className="nav-links">
              <li>
                <FaXTwitter/>
              </li>
              <li>
                <FaLinkedinIn/>
              </li>
              <li>
                <FaInstagram />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="h-line" />
      <p className="cp-text">©2025 Sachin Balagam. All rights reserved.</p>
    </div>
  );
};

export default BottomNavbar;
