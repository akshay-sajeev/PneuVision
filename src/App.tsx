import './styles/App.css';
import './styles/navbar.css'

function App() {
  return (
    <div className="app-root">
  {/* Header Banner */}
  <header className="app-header">
    <h1 className="app-title">PneuVision</h1>
    <nav>
      <button className="nav-link btn-home">Home</button>
      <button className="nav-link">About</button>
    </nav>
  </header>

  {/* Main Section */}
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

export default App;
