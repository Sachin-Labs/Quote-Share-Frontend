import React, { useEffect, useState } from "react";
import { FaCircleUser, FaXTwitter } from "react-icons/fa6";
import {
  FaQuoteLeft,
  FaGlobe,
  FaRocket,
  FaDownload,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { IoShareSocial } from "react-icons/io5";
import "../styles/home.css";
import { Link } from "react-router";
import axios from "axios";

const HomePage = () => {
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
    <div className="home-container">
      <section className="top-grid">
        <div className="left-grid">
          <h1 className="headline">
            <span className="headline-one">Speak your truth.</span>
            <span className="headline-two">Inspire the collective.</span>
          </h1>
          <p className="sub-headline">
            Deploy beautiful quotes to millions of new tabs daily. Build your personal
            brand and connect with a global community of thinkers.
          </p>
          <div className="button-container">
            {isAuthenticated ? (
              <Link to="/dashboard" className="button get-started-button">
                <FaArrowRight style={{ marginRight: "10px" }} />
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/auth" state={{ mode: 'signup' }} className="button get-started-button">
                <FaRocket style={{ marginRight: "10px" }} />
                Get Started Free
              </Link>
            )}
            <a
              href="https://chromewebstore.google.com/detail/quote-share/mkgcbeaoegecopclkmhdfieamkjejfgg"
              target="_blank"
              rel="noopener noreferrer"
              className="button install-extension-button"
            >
              <FaDownload style={{ marginRight: "10px" }} />
              Browser Extension
            </a>
          </div>
        </div>

        <div className="right-grid">
          <div className="main-grid">
            <div className="profile-card">
              <FaCircleUser />
              <div>
                <h4>Elena Vance</h4>
                <p>@elevance</p>
              </div>
            </div>
            <p className="quote-content">"Simplicity is the ultimate sophistication."</p>
            <div className="social-media-container">
              <ul className="social-media-icons">
                <li><FaXTwitter /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedinIn /></li>
              </ul>
              <div style={{ fontSize: '13px', color: 'var(--t-muted)' }}>
                <span>Shared 5m ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="second-grid">
        <h2 className="second-grid-heading">Built for distribution</h2>
        <p className="second-grid-description">
          The most consistent way to share your message. Your words,
          landing exactly where people start their journey.
        </p>
        <div className="card-container">
          <div className="card">
            <div className="icon-container"><FaCircleUser /></div>
            <h3>Verified Profiles</h3>
            <p className="quote-paragraph">
              Claim your unique handle and build a professional presence for your thoughts and philosophy.
            </p>
          </div>
          <div className="card">
            <div className="icon-container"><FaQuoteLeft /></div>
            <h3>Minimal Editor</h3>
            <p className="quote-paragraph">
              Focus on the message. Our interface removes distraction, letting your insight take center stage.
            </p>
          </div>
          <div className="card">
            <div className="icon-container"><IoShareSocial /></div>
            <h3>Cross-Platform</h3>
            <p className="quote-paragraph">
              Automatic formatting for social sharing, ensuring your quotes look premium across the web.
            </p>
          </div>
          <div className="card">
            <div className="icon-container"><FaGlobe /></div>
            <h3>New Tab Real Estate</h3>
            <p className="quote-paragraph">
              The ultimate high-visibility placement. Your approved quotes appear in browser tabs worldwide.
            </p>
          </div>
        </div>
      </section>

      <section id="community" className="fourth-grid">
        <h2 className="fourth-grid-heading">Ready to start sharing?</h2>
        <p className="fourth-grid-description">
          Join the community of creators building a more thoughtful web experience.
        </p>
        <div className="button-container">
          {isAuthenticated ? (
            <Link to="/dashboard" className="button get-started-button">
              <FaArrowRight style={{ marginRight: "10px" }} />
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/auth" state={{ mode: 'signup' }} className="button get-started-button">
              <HiUserAdd style={{ marginRight: "10px" }} />
              Create Account
            </Link>
          )}
          <a
            href="https://chromewebstore.google.com/detail/quote-share/mkgcbeaoegecopclkmhdfieamkjejfgg"
            target="_blank"
            rel="noopener noreferrer"
            className="button install-extension-button"
          >
            <FaDownload style={{ marginRight: "10px" }} />
            View Extension
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
