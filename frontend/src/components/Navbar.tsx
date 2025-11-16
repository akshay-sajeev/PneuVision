import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/PneuVisionTitle.png";

function Navbar() {
  const location = useLocation();

  return (
    <div>
      <header className="app-header">
        <img src={logo} alt="PneuVision Logo" className="nav-logo" />

        <nav>
          <Link
            className={`nav-link ${
              location.pathname === "/" ? "btn-home" : ""
            }`}
            to="/"
          >
            About
          </Link>

          <Link
            className={`nav-link ${
              location.pathname === "/upload" ? "btn-home" : ""
            }`}
            to="/upload"
          >
            Upload
          </Link>

          <Link
            className={`nav-link ${
              location.pathname === "/login" ? "btn-home" : ""
            }`}
            to="/login"
          >
            Login
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
