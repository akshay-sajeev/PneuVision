import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../AuthProvider";
import profilePic from "../assets/square-image.jpg";
import "../styles/profile_bar.css";

export default function ProfileBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-toggle" onClick={() => setIsOpen(o => !o)}>
        ☰
      </div>

      <div className="sidebar-content">
        <div className="user-section">
          <div className="user-avatar"style={{ backgroundImage: `url(${profilePic})` }}/> 
          <div className="user-info">
            <p className="user-name">
              {user?.email?.split("@")[0] || "Guest"}
            </p>
            <p className="user-email">
              {user?.email || "Not signed in"}
            </p>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Navigation</p>

          <Link
            className={`sidebar-link ${
              location.pathname === "/" ? "active" : ""
            }`}
            to="/"
          >
            <span className="link-text">Dashboard</span>
          </Link>

          <Link
            className={`sidebar-link ${
              location.pathname === "/upload" ? "active" : ""
            }`}
            to="/upload"
          >
            <span className="link-text">Upload Scan</span>
          </Link>

          <Link
            className={`sidebar-link ${
              location.pathname === "/history" ? "active" : ""
            }`}
            to="/history"
          >
            <span className="link-text">My Scans</span>
          </Link>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Tools</p>

          <Link
            className={`sidebar-link ${
              location.pathname === "/compare" ? "active" : ""
            }`}
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
