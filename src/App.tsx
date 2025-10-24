<<<<<<< HEAD

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import About from "./pages/About";
import "./styles/pages/App.css";
import "./styles/components/navbar.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        {/* Header Banner */}
        <Navbar />

        {/* Main Section */}
        <main className="container">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
=======
import './styles/App.css';
import './styles/navbar.css'

function App() {
  return (
    <div className="app-root">
  {/* Header Banner */}
  <header className="app-header">
    <h1 className="app-title">PneuVision</h1>
    <nav>
      <button className="nav-link btn-home">Home</button>
      <button className="nav-link">About</button>
    </nav>
  </header>

  {/* Main Section */}
  <main className="container">
    <div className="login-card">
      <input
        className="pill-input"
        type="text"
        placeholder="Username"
      />
      <input
        className="pill-input"
        type="password"
        placeholder="Password"
        style={{ marginTop: '1rem' }}
      />
      <button className="signin-btn" style={{ marginTop: '2.5rem' }}>Sign in</button>
    </div>
  </main>
</div>
>>>>>>> parent of fbfe7420 (Frontend with router)
  );
}

export default App;
