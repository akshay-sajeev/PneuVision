import React from 'react';
import ImageUpload from './components/ImageUpload';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">PneuVision</span>
        </div>
      </nav>
      <ImageUpload />
    </div>
  );
}

export default App;