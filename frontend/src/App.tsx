import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import ProfileBar from "./components/ProfileBar";
import Navbar from "./components/Navbar";
import Login from "./Login";
import "./styles/App.css";

/**
 * This is not actual page. It only handles the routing and redirects "/" to 
 * the Home.tsx page.
 */
function App() {
  //const [formData, setFormData] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "example" }),
      });
      
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log(result);
    } catch (error: any) {
      console.error("ERROR in catch: " + error.message);
    }
  }

  return (
    <div className="app-root">
      <Navbar />
      <ProfileBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;


/*
    <>
      <form onSubmit={handleSubmit}>
        <input id="test" type="text" value={formData} onChange={(e) => setFormData(e.target.value)}/>
        <input id="submit" type="submit" />
      </form>
    </>
    
*/