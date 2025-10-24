
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Upload from "./pages/Upload.tsx";
import "./styles/pages/App.css";
import "./styles/components/navbar.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        
        <Navbar />

        <main className="container">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
