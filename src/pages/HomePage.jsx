import React from "react";
import { FaCircleUser, FaXTwitter } from "react-icons/fa6";
import {
  FaQuoteLeft,
  FaGlobe,
  FaRocket,
  FaDownload,
  FaInstagram,
  FaLinkedinIn,
  FaHandPointRight,
  FaStar,
} from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { IoShareSocial } from "react-icons/io5";
import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="home-container">

      <section className="top-grid">
        <div className="left-grid">
          <h1 className="headline headline-one">Share your thoughts.</h1>
          <h1 className="headline headline-two">Inspire the world.</h1>
          <p className="sub-headline">
            Create beautiful quotes, build your profile, and inspire millions
            through our browser extension that shows your quotes in new tabs
            worldwide.
          </p>
          <div className="button-container">
            <button className="button get-started-button">
              <FaRocket style={{ marginRight: "10px" }} />
              Get Started
            </button>
            <button className="button install-extension-button">
              <FaDownload style={{ marginRight: "10px" }} />
              Install Extension
            </button>
          </div>
        </div>
        <div className="right-grid">
          <div className="main-grid">
            <div className="profile-card">
              <FaCircleUser />
              <div>
                <h4>Sachin Balagam</h4>
                <p>@sachinbalagam</p>
              </div>
            </div>
            <p>"The only way to do great work is to love what you do."</p>
            <div className="social-media-container">
              <ul className="social-media-icons">
                <li>
                  <FaXTwitter />
                </li>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaLinkedinIn />
                </li>
              </ul>
              <div>
                <p>2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="features" className="second-grid">
        <h1 className="second-grid-heading">Everything you need to inspire</h1>
        <p className="second-grid-description">
          Simple tools to create, share, and discover meaningful quotes that
          <br /> reach people around the world.
        </p>
        <div className="card-container">
          <div className="card">
            <div
              className="icon-container"
              style={{ backgroundColor: "#4a90e2" }}
            >
              <FaCircleUser style={{ color: "#fff" }} />
            </div>
            <h3>Create Profile</h3>
            <p className="quote-paragraph">
              Build your personal brand with a custom profile, display picture,
              and bio.
            </p>
          </div>
          <div className="card">
            <div
              className="icon-container"
              style={{ backgroundColor: "#764BA2" }}
            >
              <FaQuoteLeft style={{ color: "#fff" }} />
            </div>
            <h3>Post Quotes</h3>
            <p className="quote-paragraph">
              Share inspiring thoughts with custom captions and beautiful
              formatting.
            </p>
          </div>
          <div className="card">
            <div
              className="icon-container"
              style={{ backgroundColor: "#F093FB" }}
            >
              <IoShareSocial style={{ color: "#fff" }} />
            </div>
            <h3>Social Links</h3>
            <p className="quote-paragraph">
              Connect all your social media profiles to grow your <br />{" "}
              audience.
            </p>
          </div>
          <div className="card">
            <div
              className="icon-container"
              style={{ backgroundColor: "#22C55E" }}
            >
              <FaGlobe style={{ color: "#fff" }} />
            </div>
            <h3>Live Extension</h3>
            <p className="quote-paragraph">
              Your quotes appear in our browser extension's new tab for millions
              to see.
            </p>
          </div>
        </div>
      </section>


      <section id="extension" className="third-grid">
        <div className="third-grid-left">
          <h1>Experience quotes in every new tab</h1>
          <p>
            Our browser extension transforms every new tab into a moment of
            inspiration, featuring beautiful quotes from our global community.
          </p>
          <ul className="third-grid-left-list">
            <li>
              <FaHandPointRight style={{ marginRight: "8px" }} />
              Beautifully designed quote displays
            </li>
            <li>
              <FaHandPointRight style={{ marginRight: "8px" }} />
              Fresh inspiration with every new tab
            </li>
            <li>
              <FaHandPointRight style={{ marginRight: "8px" }} />
              Discover new voices and perspectives
            </li>
            <li>
              <FaHandPointRight style={{ marginRight: "8px" }} />
              One-click installation
            </li>
          </ul>
          <button className="third-grid-button">Add to chrome</button>
        </div>
        <div className="third-grid-right">
          <div className="tab-preview">
            <div style={{height:'10px', width:'10px', backgroundColor:'red', borderRadius:'50%'}}></div>
            <div style={{height:'10px', width:'10px', backgroundColor:'yellow', borderRadius:'50%'}}></div>
            <div style={{height:'10px', width:'10px', backgroundColor:'green', borderRadius:'50%'}}></div>
            <p style={{color:'#fff', fontWeight:'300px'}}>New Tab</p>
            </div>
          <div className="third-grid-right-main">
            <div
              className="icon-container"
              style={{ backgroundColor: "#4a90e2" }}
            >
              <FaCircleUser style={{ color: "#fff" }} />
            </div>
            <h3 className="user-name">ShivaKumar BR</h3>
            <p className="user-name">@shivakumar</p>
             <h2 className="user-name review-text" style={{fontWeight: "300"}}>
              "Every moment is a fresh beginning."
            </h2>
            <div className="social-media-container">
              <ul className="social-media-icons">
                <li>
                  <FaXTwitter style={{color:'white'}}/>
                </li>
                <li>
                  <FaInstagram style={{color:'white'}}/>
                </li>
                <li>
                  <FaLinkedinIn style={{color:'white'}}/>
                </li>
              </ul>
              </div>
          </div>
        </div>
      </section>


      <section className="second-grid">
        <h1 className="second-grid-heading">Loved by creators</h1>
        <p className="second-grid-description">
          Join thousands who are already inspiring thousands with their words.
        </p>
        <div className="user-card-container">
          <div className="user-card">
            <div className="user-profile">
              <div
                className="icon-container"
                style={{ backgroundColor: "#4a90e2" }}
              >
                <FaCircleUser style={{ color: "#fff" }} />
              </div>
              <div className="user-details">
                <h3>SaiKiran Desharaju</h3>
                <pre>@saikirand</pre>
              </div>
            </div>
            <p className="review-text">
              "QuoteShare has become my daily source of inspiration. Seeing my
              quotes reach people globally through the extension is incredible!"
            </p>
            <div>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} style={{ color: "#FFD700" }} />
              ))}
            </div>
          </div>
          <div className="user-card">
            <div className="user-profile">
              <div
                className="icon-container"
                style={{ backgroundColor: "#53Cb26" }}
              >
                <FaCircleUser style={{ color: "#fff" }} />
              </div>
              <div className="user-details">
                <h3>Shivaprasad M</h3>
                <pre>@shivaprasadm</pre>
              </div>
            </div>
            <p className="review-text">
              "The extension brings me joy every morning. It's amazing how a
              simple quote can change your entire day's perspective."
            </p>
            <div>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} style={{ color: "#FFD700" }} />
              ))}
            </div>
          </div>
          <div className="user-card">
            <div className="user-profile">
              <div
                className="icon-container"
                style={{ backgroundColor: "#96B95f" }}
              >
                <FaCircleUser style={{ color: "#fff" }} />
              </div>
              <div className="user-details">
                <h3>VenkataRao CH</h3>
                <pre>@venkatarao</pre>
              </div>
            </div>
            <p className="review-text">
              "Building my personal brand through QuoteShare has opened so many
              doors. The platform is beautifully designed and easy to use."
            </p>
            <div>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} style={{ color: "#FFD700" }} />
              ))}
            </div>
          </div>
          <div className="user-card">
            <div className="user-profile">
              <div
                className="icon-container"
                style={{ backgroundColor: "#7FD790" }}
              >
                <FaCircleUser style={{ color: "#fff" }} />
              </div>
              <div className="user-details">
                <h3>Roopasowmya</h3>
                <pre>@roopasowmya</pre>
              </div>
            </div>
            <p className="review-text">
              “I never thought a browser extension could make such a difference.
              Seeing meaningful quotes right when I open a new tab is like a
              daily dose of motivation.”
            </p>
            <div>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} style={{ color: "#FFD700" }} />
              ))}
            </div>
          </div>
        </div>
      </section>


      <section id="community" className="fourth-grid">
        <h1 className="fourth-grid-heading">Ready to inspire the world?</h1>
        <p className="fourth-grid-description">
          Join our community of creators and start sharing your thoughts with
          millions of people
          <br /> worldwide.
        </p>
        <div className="button-container">
          <button className="get-started-button button">
            <HiUserAdd style={{ marginRight: "10px" }} />
            Create Account
          </button>
          <button className="install-extension-button button">
            <FaDownload style={{ marginRight: "10px" }} />
            Install Extension
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
