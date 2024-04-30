import { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

function App() {
  const [logedInUser, setLogedInUser] = useState({});

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login setLogedInUser={setLogedInUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard logedInUser={logedInUser} />} />
      </Routes>
    </div>
  );
}

export default App;
