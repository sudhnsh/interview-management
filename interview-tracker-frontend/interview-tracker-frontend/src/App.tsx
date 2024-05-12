import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateInterviewForm from "./components/form";
import SignupForm from "./components/signup";
import SigninForm from "./components/signin";
import logo from "./logo.svg";
import "./App.css";

function App(): JSX.Element {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/candidate" element={<CandidateInterviewForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
