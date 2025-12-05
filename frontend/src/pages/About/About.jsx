import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  return (
    <div id="_79_54__About" className="about-root">
      <NavBar />
      <span id="_79_59__What_you_should_know" className="about-title">
          <span>
          <span className="about-title-black">What you should&nbsp;</span>
          <span className="about-title-highlight">know</span>
          <span className="about-title-black"> about us!</span>
            </span>
          </span>

      <span id="_80_63__Dedicated_to_Smarter" className="about-subtitle">
        <span className="about-subtitle-black">
          Dedicated to Smarter Health and Safer Aging
        </span>
          </span>

      <div id="_79_60__Frame_9" className="about-frame-9">
        <span id="_79_61__ABOUT_US" className="about-aboutus">
          <span className="about-aboutus-text">ABOUT US</span>
          </span>
        </div>

      <div id="_80_65__Frame_15" className="about-quote-frame">
        <span id="_80_66___" className="about-quote-mark">
          <span className="about-quote-mark-text">“</span>
          </span>
        <span id="_80_67__We_are_dedicated_to_" className="about-quote-content">
          <span className="about-quote-content-text">
              We are dedicated to making elderly care smarter <br />
            and safer through AI-powered health<br />
            monitoring. Our platform combines <br />
              real-time data, early risk detection, <br />
              and caregiver support for reliable <br />
              and accessible care.”
            </span>
          </span>
          <span
            id="_80_68__ELDERLYCARE_AI"
            onClick={() => navigate("/")}
          className="about-ecai"
          >
            <span>
            <span className="about-ecai-black">ELDERLY</span>
            <span className="about-ecai-highlight">CARE.AI</span>
            </span>
          </span>
        </div>

      <div id="_80_80__Frame_17" className="about-frame-empty"></div>
      <div id="_80_75__Frame_16" className="about-frame-left">
        <span id="_80_76___" className="about-quote-mark">
          <span className="about-quote-mark-text">“</span>
        </span>
      </div>
    </div>
  );
};

export default About;
