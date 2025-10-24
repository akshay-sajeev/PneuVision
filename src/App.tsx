
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
  );
}

export default App;
