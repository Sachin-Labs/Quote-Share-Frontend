
import { Link } from "react-router";
import '../styles/navbar.css'; 

const TopNavbar = () => {
  return (
    <nav>
        <p className="logo"><span className="logo-quote">"</span>QuoteShare</p>
      {/* <ul className="nav-links">
        <li>
          <a  href='#features' className="link">Features</a>
        </li>
        <li>
          <a href="#extension" className="link">Extension</a>
        </li>
        <li>
          <a href="#community" className="link">Community</a>
        </li>
      </ul> */}
      <Link className="link link-button" to='/auth'>Sign In</Link>
    </nav>
  );
};

export default TopNavbar;
