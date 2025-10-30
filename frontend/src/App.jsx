import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Services from "./pages/Services/Services.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Register/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Image3 from "./pages/Image3.jsx";
import Image7 from "./pages/Image7.jsx";
import Notification from "./pages/Notification.jsx";
import HeartRateLevelHistory from "./pages/HeartRateLevelHistory.jsx";
import Image13 from "./pages/Image13.jsx";
import OxygenLevelHistory from "./pages/OxygenLevelHistory.jsx";
import Explanation from "./pages/Explanation.jsx";
import Frame27 from "./pages/Frame27.jsx";
import Frame28 from "./pages/Frame28.jsx";
import Frame29 from "./pages/Frame29.jsx";

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
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Image3" element={<Image3 />} />
        <Route path="/Image7" element={<Image7 />} />
        <Route path="/Notification" element={<Notification />} />
        <Route
          path="/HeartRateLevelHistory"
          element={<HeartRateLevelHistory />}
        />
        <Route path="/Image13" element={<Image13 />} />
        <Route path="/OxygenLevelHistory" element={<OxygenLevelHistory />} />
        <Route path="/Explanation" element={<Explanation />} />
        <Route path="/Frame27" element={<Frame27 />} />
        <Route path="/Frame28" element={<Frame28 />} />
        <Route path="/Frame29" element={<Frame29 />} />
      </Routes>
    </Router>
  );
};

export default App;
