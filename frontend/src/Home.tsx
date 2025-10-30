function Home() {
    return (
      <div> 
        <main className="container">
          <div className="login-card">
            <p className="home-description">
              <strong>PneuVision</strong> is a clinical support tool designed 
              to assist healthcare professionals in evaluating chest X-rays for 
              signs of pneumonia. Our AI-powered system provides rapid analysis and 
              visual heatmaps to highlight regions of interest, helping doctors 
              confirm diagnoses, identify areas that may have been overlooked, 
              and make more informed decisions with confidence. This platform is 
              intended to complement, not replace, clinical expertise, enhancing 
              accuracy and efficiency in diagnostic workflows.
            </p>  
            <div>
              <button className="signin-btn">Upload Scan</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  export default Home;