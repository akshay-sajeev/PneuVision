import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { auth } from "../firebaseConfig";
import "../styles/profile_bar.css"
import { signOut } from "firebase/auth";

export default function ProfileBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  /* Check if the user is logged in */
  const { loading, user } = useAuth();
  if (loading) {
    return <p>Loading...</p>
  } 

  /* Log the user out if they are logged in */
  async function handleLog(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      if (user) {
        navigate("/login");
        await signOut(auth);
      } else {
        navigate("/login");
      }
    } catch (e: any) {
      console.error("Error with login/logout: ", e);
    }
  }

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
          {isOpen && <button id="logout" className="pb-el" onClick={handleLog}>
            {user ? "Log Out" : "Log In"}
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