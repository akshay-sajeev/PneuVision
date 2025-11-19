import { Link } from "react-router-dom";
import heroXray from "./assets/hero_xray.png";
import aiBrain from "./assets/ai_medical.png";

function Home() {
  return (
    <div className="home-root">
      <main className="home-container">

        <section className="home-hero-section">
          <div className="hero-text">
            <h1 className="hero-title">Smarter Chest X-Ray Analysis</h1>
            <p className="hero-subtitle">
              AI-powered interpretation designed to support clinicians with faster, clearer, and more reliable insights.
            </p>

            <Link to="/upload">
              <button className="signin-btn home-hero-btn">Upload Scan</button>
            </Link>
          </div>

          <img src={heroXray} alt="Chest X-ray" className="hero-image" />
        </section>

        <section className="home-info-card">
          <div className="info-left">
            <img src={aiBrain} alt="AI medical illustration" className="info-image" />
          </div>

          <div className="info-right">
            <h2 className="info-title">Advanced Clinical Assistance</h2>

            <p className="home-description">
              <strong>PneuVision</strong> assists healthcare professionals in evaluating chest X-rays 
              for signs of pneumonia using state-of-the-art machine learning. The system generates 
              predictions and intuitive heatmaps that highlight important regions, helping clinicians 
              confirm diagnoses, catch subtle abnormalities, and improve workflow efficiency.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;
