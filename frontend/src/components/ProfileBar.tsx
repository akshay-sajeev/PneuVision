import { useState } from "react";
import "../styles/profile_bar.css"

export default function ProfileBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      id="profile-bar" 
      className={`profile-bar ${isOpen ? "expanded" : ""}`}
    >
      <div 
        className="pb-header"
        onClick={() => setIsOpen(isOpen => !isOpen)}
      >
        ☰
      </div>
      <div className="profile-options">
          {isOpen && <button id="logout" className="pb-el">
            Log Out
          </button>}
          {isOpen && <button id="Account" className="pb-el">
            Account
          </button>}
          {isOpen && <button id="Profile" className="pb-el">
            Profile 
          </button>}
      </div>
    </div>
  );
}