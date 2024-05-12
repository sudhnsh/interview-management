import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://101.0.62.118/32/signup", {
        username,
        password,
      });
      console.log("Signup successful:", response.data);
      // Retrieve JWT token from response data
      const token = response.data.token;
      // Store token in localStorage for future use
      localStorage.setItem("token", token);
      // Redirect to /candidate route
      history("/signin");
    } catch (error: any) {
      console.error("Error signing up:", error.response.data);
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSignup}>
        <h2 style={{ color: "white" }}>Signup</h2>
        <div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
