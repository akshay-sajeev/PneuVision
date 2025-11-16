import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import "../styles/profile_bar.css";
import profilePic from "../assets/square-image.jpg";


export default function ProfileBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout?.();
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-toggle" onClick={() => setIsOpen(o => !o)}>
        ☰
      </div>

      <div className="sidebar-content">
        {/* User */}
        <div className="user-section">
          <div className="user-avatar"style={{ backgroundImage: `url(${profilePic})` }}/>
          {isOpen && (
            <div className="user-info">
              <p className="user-name">{user?.email?.split("@")[0] || "Guest"}</p>
              <p className="user-email">{user?.email || "Not signed in"}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="sidebar-section">
          {isOpen && <p className="sidebar-label">Navigation</p>}
          <Link
            className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
            to="/"
          >
            <span className="link-text">Dashboard</span>
          </Link>
          <Link
            className={`sidebar-link ${location.pathname === "/upload" ? "active" : ""}`}
            to="/upload"
          >
            <span className="link-text">Upload Scan</span>
          </Link>
          <Link
            className={`sidebar-link ${location.pathname === "/history" ? "active" : ""}`}
            to="/history"
          >
            <span className="link-text">My Scans</span>
          </Link>
        </div>

        {/* Tools */}
        <div className="sidebar-section">
          {isOpen && <p className="sidebar-label">Tools</p>}
          <Link
            className={`sidebar-link ${location.pathname === "/compare" ? "active" : ""}`}
            to="/compare"
          >
            <span className="link-text">Compare Scans</span>
          </Link>
        </div>
      </div>

      <button className="sidebar-logout" onClick={handleLogout}>
        <span className="link-text">Log Out</span>
      </button>
    </div>
  );
}
