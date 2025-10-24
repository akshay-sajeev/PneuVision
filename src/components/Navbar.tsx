
import { Link } from "react-router-dom";
import "../styles/components/navbar.css";

export default function Navbar() {
  return (
    <header className="app-header">
      <h1 className="app-title">PneuVision</h1>
      <nav>
        
        <Link to="/" className="nav-link btn-home">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/upload" className="nav-link">
          Upload
        </Link>
      </nav>
    </header>
  );
}
