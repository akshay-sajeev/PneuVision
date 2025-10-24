
export default function Home() {
  return (
    <div className="login-card">
      <input className="pill-input" type="text" placeholder="Username" />
      <input
        className="pill-input"
        type="password"
        placeholder="Password"
        style={{ marginTop: "1rem" }}
      />
      <button className="signin-btn" style={{ marginTop: "2.5rem" }}>
        Sign in
      </button>
    </div>
  );
}
