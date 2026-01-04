import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-root">
      <NavBar />
      
      <div className="about-content">
        <div className="about-header">
          <div className="about-badge">ABOUT US</div> 
          <h1 className="about-title">
            What you should <span className="red-text">know</span> about us!
          </h1>
          
          <p className="about-subtitle">
            Dedicated to Smarter Health and Safer Aging
          </p>
        </div>

        <div className="cards-container">
          <div className="card side-card"></div>
          <div className="card center-card">
            <div className="quote-mark">“</div>
            <p className="quote-text">
              We are dedicated to making elderly care smarter 
              and safer through AI-powered health 
              monitoring. Our platform combines 
              real-time data, early risk detection, 
              and caregiver support for reliable 
              and accessible care.
            </p>

            <div 
              className="signature"
              onClick={() => navigate("/")}
            >
              <span className="sig-black">ELDERLY</span>
              <span className="sig-red">CARE.AI</span>
            </div>
          </div>

          <div className="card side-card"></div>
          
        </div>
      </div>
    </div>
  );
};

export default About;