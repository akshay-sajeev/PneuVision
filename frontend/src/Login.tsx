import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, 
         createUserWithEmailAndPassword
} from "firebase/auth";
import { useState, type ChangeEvent } from "react";
import { Navigate } from "react-router-dom";
import ProfileBar from "./components/ProfileBar";
import Navbar from "./components/Navbar";
import { useAuth } from "./AuthProvider";
import "./styles/App.css";

/* Custom type to hold user email and password */
type UserCreds = {
  email: string,
  password: string,
};

/**
 * Manages use credentials by storing them in state
 * @returns Component handling user login/signup and authentication
 */
function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(""); 
  const [credentials, setCredentials] = useState<UserCreds>({
    email: "",
    password: ""
  });

  /* Check if logged in already */
  const { user, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>
  }

  if (user) {
    return <Navigate to="/" />; // If logged in, go to home page
  }
  
  /* Handles when the email/password fields experience user input */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials(prevCred => ({
      ...prevCred,
      [name]: value,
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
        setError(() => "Please sign up instead.");
      } else if (e.code === "auth/wrong-password") {
        setError(() => "Password is incorrect.");
      } else {
        setError(e.code);
      }
    }
  }

  function toggleSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsSignUp(signUp => !signUp);
  }

  return (
    <div className="app-root">
      <Navbar />
      <ProfileBar />
      <main className="container">
        <form className="login-card" onSubmit={handleSubmit}>
          <h1 className="login-title">{isSignUp ? "Sign Up" : "Log In"}</h1>
          <p className="signup-toggle">
            {isSignUp 
              ? <button onClick={toggleSignUp}>Log in instead</button> 
              : <button onClick={toggleSignUp}>Sign up instead</button>
            }
          </p>
          <input
            className="pill-input"
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="pill-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="signin-btn" type="submit" style={{ marginTop: '2.5rem' }}>
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="login-error-msg">{error}</p>
      </main>
    </div>
  );
}

export default Login;
