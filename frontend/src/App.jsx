import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Services from "./pages/Services/Services.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Register/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Notification from "./pages/Notification/Notification.jsx";
import HeartRateLevelHistory from "./pages/Heart/HeartRateLevelHistory.jsx";
import OxygenLevelHistory from "./pages/Oxygen/OxygenLevelHistory.jsx";
import Explanation from "./pages/Explanation/Explanation.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/HeartRateLevelHistory" element={<HeartRateLevelHistory />} />
        <Route path="/OxygenLevelHistory" element={<OxygenLevelHistory />} />
        <Route path="/Explanation" element={<Explanation />} />
      </Routes>
    </Router>
  );
};

export default App;
