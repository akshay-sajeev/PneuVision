import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProfileBar from "./components/ProfileBar";
import Navbar from "./components/Navbar";
import Login from "./Login";
import Upload from "./pages/Upload";
import "./styles/App.css";

/**
 * This is not actual page. It only handles the routing and redirects "/" to 
 * the Home.tsx page.
 */
function App() {
  return (
    <div className="app-root">
      <Navbar />
      <ProfileBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;