import { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
