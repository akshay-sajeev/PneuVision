import { Link } from "react-router-dom";
import "../styles/navbar.css";


function Navbar() {
  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">PneuVision</h1>
        <nav>
          
          <Link className="nav-link btn-home" to="/">About</Link>
          <Link className="nav-link" to="/login">Login</Link>
           <Link className="nav-link upload-btn" to="/upload">Upload</Link>
          
        </nav>
      </header>
    </div>
  );
}

/*
 
          <button className="nav-link btn-home">Home</button>
          <button className="nav-link">About</button>
*/

export default Navbar;