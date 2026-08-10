import { Link } from "react-router";

const BottomNavbar = () => {
  return (
    <div className="bottom-container">
      <div className="bottom-first-card">
        <div className="bottom-logo-card">
          <p className="logo">
            <img src="/sina-quotes-logo.svg" alt="Sina Quotes Logo" className="logo-icon" />
            SINA Quotes
          </p>
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
              {/* <li>
                <Link to="/contributions" className="bottom-link">
                  Contributions
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <hr className="h-line" />
      <p className="cp-text">©2025 <a href="https://www.linkedin.com/in/sachinbalagam/">Sachin Balagam.</a> All rights reserved.</p>
    </div>
  );
};

export default BottomNavbar;
