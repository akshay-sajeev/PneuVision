import { useState } from "react";
import ProfileBar from "./components/ProfileBar";
import Navbar from "./components/Navbar";
import "./styles/App.css";

function Login() {
  return (
    <div className="app-root">
      <Navbar />
      <ProfileBar />
      <main className="container">
        <div className="login-card">
          <input
            className="pill-input"
            type="text"
            placeholder="Username"
          />
          <input
            className="pill-input"
            type="password"
            placeholder="Password"
            style={{ marginTop: '1rem' }}
          />
          <button className="signin-btn" style={{ marginTop: '2.5rem' }}>Sign in</button>
        </div>
      </main>
    </div>
  );
}

export default Login;