import { useNavigate } from "react-router-dom";
import React from "react";
import NavBar from "../../components/NavBar";
import ServiceCarousel from "../../components/ServiceCarousel";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();
  return (
    <div id="services">
       <NavBar />
      <div className="container">
        <div className="header">
          <div className="title-box">
            <span className="title-text">OUR SERVICES</span>
          </div>
        </div>

        <div className="image-left"></div>

        <div className="text-section">
          <h1 className="main-title">
            <span className="black-text">Connected Health </span>
            <span className="red-text">Services</span>
          </h1>
          <h2 className="sub-title">
            <span className="black-text">empowering </span>
            <span className="red-text">elderly care </span>
            <span className="black-text">through smart technology.</span>
          </h2>
          <p className="description">
            A smart and user-friendly AI platform that monitors elderly health
            and empowers informed, safer living.
          </p>
        </div>
        <ServiceCarousel />

        <div className="decorative ellipse-left"></div>
        <div className="decorative ellipse-right"></div>
      </div>
    </div>
  );
};

export default Services;
