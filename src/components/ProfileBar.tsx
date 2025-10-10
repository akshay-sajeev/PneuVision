import React, { useState } from "react";
import "../styles/profile_bar.css"

export default function ProfileBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      id="profile_bar" 
      className={`profile_bar ${isOpen ? "expanded" : ""}`}
      onClick={() => setIsOpen(isOpen => !isOpen)}
    >
      <div className="pb_header"></div>
      <div className="profile_options">
        <button id="logout" className="pb_el">
          {isOpen && <span>Log Out</span>}
        </button>
        <button id="account" className="pb_el">
          {isOpen && <span>Account</span>}
        </button>
        <button id="profile" className="pb_el">
          {isOpen && <span>Profile</span>}
        </button>
      </div>
    </div>
  );
}