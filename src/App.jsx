import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [logedInUser, setLogedInUser] = useState({});

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    userStr && setLogedInUser(JSON.parse(userStr));
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={<Login setLogedInUser={setLogedInUser} logedInUser={logedInUser} />}
        />
        <Route path="/signup" element={<Signup logedInUser={logedInUser}/>} />
        <Route path="/dashboard" element={<Dashboard logedInUser={logedInUser} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
