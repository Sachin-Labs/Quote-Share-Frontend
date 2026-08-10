import React, { useEffect, useState } from "react";
import { 
  UserCircle, 
  Quote, 
  Globe, 
  Rocket, 
  Download, 
  ArrowRight, 
  PenTool, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink,
  Sparkles
} from "lucide-react";
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
      {/* Hero Section */}
      <section className="top-grid">
        <div className="hero-glow" />
        <div className="left-grid">
          <div className="sparkles-pill">
            <Sparkles className="sparkle-icon" size={14} />
            <span>Premium Quote Distribution Platform</span>
          </div>
          <h1 className="headline">
            <span className="headline-one">Speak your truth.</span>
            <span className="headline-two">Inspire the collective.</span>
          </h1>
          <p className="sub-headline">
            SINA Quotes is a premium workspace for writers, thinkers, and creators. 
            Craft beautiful insights in a distraction-free editor and distribute them 
            directly to new browser tabs worldwide.
          </p>
          <div className="button-container">
            {isAuthenticated ? (
              <Link to="/dashboard" className="button get-started-button">
                Go to Dashboard <ArrowRight style={{ marginLeft: "8px" }} size={16} />
              </Link>
            ) : (
              <Link to="/auth" state={{ mode: 'signup' }} className="button get-started-button">
                Start Publishing Free <Rocket style={{ marginLeft: "8px" }} size={16} />
              </Link>
            )}
            <a
              href="https://chromewebstore.google.com/detail/quote-share/mkgcbeaoegecopclkmhdfieamkjejfgg"
              target="_blank"
              rel="noopener noreferrer"
              className="button install-extension-button"
            >
              <Download style={{ marginRight: "8px" }} size={16} /> Add browser extension
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <h3 className="stat-value">1.2M+</h3>
            <p className="stat-label">Monthly Impressions</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">25K+</h3>
            <p className="stat-label">Active Tab Users</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">100%</h3>
            <p className="stat-label">Distraction-Free</p>
          </div>
        </div>

        {/* Premium Interactive Browser Mockup */}
        <div className="preview-section">
          <div className="preview-glow" />
          <div className="browser-mockup">
            <div className="browser-header">
              <div className="browser-dots">
                <span className="dot dot-close" />
                <span className="dot dot-minimize" />
                <span className="dot dot-expand" />
              </div>
              <div className="browser-tab">
                <img src="/sina-quotes-logo.svg" alt="" className="tab-icon" />
                <span>New Tab</span>
              </div>
              <div className="browser-address-bar">https://newtab.sina-quotes.work.gd</div>
            </div>
            <div className="browser-content">
              <div className="newtab-glow" />
              <div className="newtab-main">
                <div className="newtab-quote-block">
                  <Quote className="quote-mark" size={28} />
                  <p className="newtab-quote-text">
                    The only way to do great work is to love what you do.
                  </p>
                  <p className="newtab-quote-author">— Steve Jobs</p>
                </div>
              </div>
              <div className="newtab-footer">
                <div className="newtab-profile">
                  <UserCircle className="newtab-avatar-icon" size={32} />
                  <div className="profile-info">
                    <span className="profile-name">Steve Jobs</span>
                    <span className="profile-handle">@stevejobs</span>
                  </div>
                </div>
                <div className="newtab-stats-widget">
                  <span className="widget-dot" />
                  <span>Verified Creator · 12.4K Views Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-content">
          <div className="section-tag">
            <Sparkles className="sparkle-icon" size={14} />
            <span>The SINA Ecosystem</span>
          </div>
          <h2 className="philosophy-heading">
            A distribution channel built for ideas that matter
          </h2>
          <p className="philosophy-text">
            SINA Quotes is designed to solve the distribution problem for creators of short-form philosophy, inspiration, and thoughts. 
            Instead of writing insights that get buried in chronological social media algorithms, 
            your verified thoughts get published directly onto the new tab pages of thousands of professionals daily. 
          </p>
          <p className="philosophy-text">
            Every quote features a direct link to your verified bio page, allowing you to establish authoritative, 
            long-term audience growth while providing a beautiful, mindful new tab workspace.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="second-grid">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles className="sparkle-icon" size={14} />
            <span>Platform Features</span>
          </div>
          <h2 className="second-grid-heading">Built to capture, style, and scale</h2>
          <p className="second-grid-description">
            Everything you need to write and showcase your message to the world.
          </p>
        </div>
        
        <div className="card-container">
          <div className="card">
            <div className="icon-container">
              <UserCircle size={20} />
            </div>
            <h3>Verified Creator Profiles</h3>
            <p className="quote-paragraph">
              Claim your unique handle, build a clean public home for your quotes, and link to your portfolio.
            </p>
          </div>
          
          <div className="card">
            <div className="icon-container">
              <Globe size={20} />
            </div>
            <h3>New Tab Distribution</h3>
            <p className="quote-paragraph">
              Access the ultimate digital real estate. Your approved quotes appear on new tab backgrounds globally.
            </p>
          </div>
          
          <div className="card">
            <div className="icon-container">
              <PenTool size={20} />
            </div>
            <h3>Zen Writing Space</h3>
            <p className="quote-paragraph">
              Focus entirely on the words. Our distraction-free writing client provides a quiet, minimalist canvas.
            </p>
          </div>
          
          <div className="card">
            <div className="icon-container">
              <ExternalLink size={20} />
            </div>
            <h3>Cross-Platform Exports</h3>
            <p className="quote-paragraph">
              Automatically format and export quotes as cards optimized for LinkedIn, Instagram, and X.
            </p>
          </div>
          
          <div className="card">
            <div className="icon-container">
              <TrendingUp size={20} />
            </div>
            <h3>Real-Time Analytics</h3>
            <p className="quote-paragraph">
              Monitor tab views, likes, shares, and saves to see which ideas resonate most with your audience.
            </p>
          </div>
          
          <div className="card">
            <div className="icon-container">
              <ShieldCheck size={20} />
            </div>
            <h3>Ecosystem Quality Review</h3>
            <p className="quote-paragraph">
              Every quote goes through peer and admin verification to maintain high standards and prevent spam.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles className="sparkle-icon" size={14} />
            <span>Workflow</span>
          </div>
          <h2 className="how-it-works-heading">Publish in three simple steps</h2>
          <p className="how-it-works-description">
            Go from initial draft to a global audience in under five minutes.
          </p>
        </div>
        
        <div className="steps-container">
          <div className="step-card">
            <div className="step-num">01</div>
            <h3>Claim your handle</h3>
            <p>Sign up, create your public page, and establish your verified creator credentials.</p>
          </div>
          <div className="step-card">
            <div className="step-num">02</div>
            <h3>Craft your quotes</h3>
            <p>Compose your thoughts using the distraction-free editor and submit them for review.</p>
          </div>
          <div className="step-card">
            <div className="step-num">03</div>
            <h3>Scale your impact</h3>
            <p>Your verified quotes appear on browser new tabs and can be exported as beautiful social cards.</p>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-glow" />
          <div className="cta-content">
            <h2 className="cta-heading">Ready to speak your truth?</h2>
            <p className="cta-description">
              Join the collective of authors, thinkers, and builders sharing ideas. Create your free account today.
            </p>
            <div className="button-container">
              {isAuthenticated ? (
                <Link to="/dashboard" className="button get-started-button">
                  Go to Dashboard <ArrowRight style={{ marginLeft: "8px" }} size={16} />
                </Link>
              ) : (
                <Link to="/auth" state={{ mode: 'signup' }} className="button get-started-button">
                  Start Publishing <Rocket style={{ marginLeft: "8px" }} size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
