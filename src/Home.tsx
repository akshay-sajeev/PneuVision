import React from "react";
import "./styles/App.css";
import "./styles/navbar.css";

function Home() {
  return (
    <div className="app-root" style={{ fontFamily: "'Canva Sans', sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>

      {/* Navbar */}
      <header className="app-header">
        <h1 className="app-title">PneuVision</h1>
        <nav>
          <button className="nav-link btn-home">Home</button>
          <button className="nav-link">About</button>
          <button className="nav-link">Contact</button>
        </nav>
      </header>

      {/* Main content container */}
      <main className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "3rem", paddingBlock: "3rem", height: 'fit-content'}}>
        <div
          className="login-card"
          style={{
            padding: "2rem",
            maxWidth: "900px",
            width: "95%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            backgroundColor: "#fff", // pure white
            borderRadius: "1rem",
            boxShadow: "0 6px 20px rgba(255, 255, 255, 0.1)",
            minHeight: "24vh", // fills most of the page vertically
          }}
        >
          {/* Description */}
          <p
            className="home-description"
            style={{
              lineHeight: 1.7,
              fontSize: "1.5rem", // 1.5 times bigger
              color: "#111",
              margin: 0
            }}
          >
            <strong style={{ color: "var(--pv-purple)" }}>PneuVision</strong> AI is a clinical support tool designed to assist healthcare professionals in evaluating chest X-rays for signs of pneumonia. Our AI-powered system provides rapid analysis and visual heatmaps to highlight regions of interest, helping doctors confirm diagnoses, identify areas that may have been overlooked, and make more informed decisions with confidence. This platform is intended to complement, not replace, clinical expertise, enhancing accuracy and efficiency in diagnostic workflows.
          </p>

          {/* Upload Scan button centered at bottom */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="signin-btn">Upload Scan</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
