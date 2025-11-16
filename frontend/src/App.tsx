import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Compare from "./pages/Compare";
import Navbar from "./components/Navbar";
import ProfileBar from "./components/ProfileBar";
import "./styles/App.css";

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <ProfileBar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/history" element={<History />} />
      <Route path="/compare" element={<Compare />} />
    </Routes>

    </div>
  );
}

export default App;
