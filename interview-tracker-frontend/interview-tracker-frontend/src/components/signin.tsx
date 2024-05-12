import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./signin.css";

const SigninForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); // State for error message
  const history = useNavigate();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://101.0.62.118/32/login", {
        username,
        password,
      });
      console.log("Signin successful:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      history("/candidate");
    } catch (error: any) {
      console.error("Error signing in:", error.response.data);
      setError(error.response.data.message); // Set the error message
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSignin}>
        <div>
          <div className="signup-link">
            <Link to="/" style={{ color: "white" }}>
              Go to Sign Up
            </Link>
          </div>
          <h2 style={{ color: "white" }}>Sign In</h2>
          <input
            placeholder="Username:"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message if present */}
      </form>
    </div>
  );
};

export default SigninForm;
