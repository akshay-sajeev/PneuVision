import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="content-container">
      <div className="description-text text-center mb-5">
        <h2><span className="purple-text">PneuVision</span> AI is a clinical support tool designed to assist healthcare professionals in evaluating chest X-rays for signs of pneumonia.</h2>
        <p className="mt-4">
          Our AI-powered system provides rapid analysis and visual heatmaps to highlight regions of interest, 
          helping doctors confirm diagnoses, identify areas that may have been overlooked, and make more 
          informed decisions with confidence. This platform is intended to complement, not replace, clinical expertise, 
          enhancing accuracy and efficiency in diagnostic workflows.
        </p>
        <div className="mt-5">
          <Link to="/upload" className="upload-button">
            Upload Scan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;