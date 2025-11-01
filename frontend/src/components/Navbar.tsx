import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">PneuVision</h1>
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
              location.pathname === "/login" ? "btn-home" : ""
            }`}
            to="/login"
          >
            Login
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/upload" ? "btn-home" : ""
            }`}
            to="/upload"
          >
            Upload
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
