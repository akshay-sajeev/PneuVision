import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="app-header">
      <h1 className="app-title">PneuVision</h1>
      <nav>
        <button className="nav-link btn-home">Home</button>
        <button className="nav-link">About</button>
      </nav>
    </header>
  );
}

export default Navbar;