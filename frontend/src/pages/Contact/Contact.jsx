import { useNavigate } from "react-router-dom";
import React from "react";
import NavBar from "../../components/NavBar";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="contact-root">
      <NavBar />
      
      <img
        src="/ellipse_10.svg"
        alt=""
        className="contact-decor-ellipse"
        aria-hidden="true"
      />

      <div className="contact-container">
        
        <div className="contact-header">
          <div className="contact-badge">CONTACT US</div>
          
          <h1 className="contact-title">
            <span className="text-black">ELDERLY</span>
            <span className="text-highlight">CARE.AI</span>
          </h1>
          
          <h2 className="contact-subtitle">
            Caring Through Smart Technology
          </h2>
        </div>

        <div className="contact-content-wrapper">
          
          <div className="contact-details-box">
            <h3>Contact Details:</h3>
            <ul className="contact-list">
              <li>
                <span className="name">Alcantara, John Claude L.</span>
                <a href="mailto:0322-3585@lspu.edu.ph" className="email-link">
                  0322-3585@lspu.edu.ph
                </a>
              </li>
              <li>
                <span className="name">Mamalateo, Maria Fatima M.</span>
                <a href="mailto:0322-3507@lspu.edu.ph" className="email-link">
                  0322-3507@lspu.edu.ph
                </a>
              </li>
            </ul>
          </div>

          <div className="contact-legal">
            <h4>Legal:</h4>
            <ul className="legal-links">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
            </ul>
          </div>

        </div>

      </div>
      <div className="contact-footer-bar" />
    </div>
  );
};

export default Contact;