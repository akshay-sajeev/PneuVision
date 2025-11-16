import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, type ChangeEvent } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./AuthProvider";
import "./styles/App.css";

type UserCreds = {
  email: string;
  password: string;
};

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<UserCreds>({
    email: "",
    password: ""
  });

  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/" />;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      } else {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      }
    } catch (e: any) {
      if (e.code === "auth/user-not-found") {
        setError("No account found. Please sign up.");
      } else if (e.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError(e.code);
      }
    }
  }

  function toggleMode(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsSignUp(prev => !prev);
    setError("");
  }

  return (
    <div className="app-root">
      <Navbar />

      <main className="container login-container">
        <form className="login-card clean-login-card" onSubmit={handleSubmit}>
          
          <h1 className="login-title">{isSignUp ? "Create Account" : "Welcome Back"}</h1>

          <p className="login-subtitle">
            {isSignUp ? "Sign up to get started" : "Log in to continue"}
          </p>

          <input
            className="pill-input wide-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="pill-input wide-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="signin-btn wide-btn" type="submit">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>

          <button className="toggle-mode-btn" onClick={toggleMode}>
            {isSignUp ? "Already have an account? Log in" : "New here? Create an account"}
          </button>

          {error && <p className="login-error-msg">{error}</p>}
        </form>
      </main>
    </div>
  );
}

export default Login;
