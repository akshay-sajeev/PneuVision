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
          <h2 className="login-title">Login</h2>
          
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
          <button className="signin-btn" style={{ marginTop: '2.5rem' }}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
