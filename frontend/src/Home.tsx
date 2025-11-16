import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-root">
      <main className="container">
        <div className="login-card home-card">

          <h1 className="home-title">Welcome to PneuVision</h1>
          <p className="home-subtitle">
            AI-assisted chest X-ray interpretation for fast, confident clinical support.
          </p>

          <p className="home-description">
            <strong>PneuVision</strong> helps healthcare professionals evaluate chest X-rays 
            for signs of pneumonia using advanced AI analysis. The system provides rapid 
            predictions and intuitive heatmaps that highlight areas of interest, helping 
            clinicians confirm diagnoses, catch subtle findings, and improve decision-making 
            accuracy. PneuVision supports clinical expertise by offering an additional layer 
            of clarity and efficiency within diagnostic workflows.
          </p>

          <Link to="/upload">
            <button className="signin-btn home-upload-btn">Upload Scan</button>
          </Link>

        </div>
      </main>
    </div>
  );
}

export default Home;
