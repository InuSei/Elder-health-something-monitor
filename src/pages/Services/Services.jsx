import { useNavigate } from "react-router-dom";
import React from "react";
import NavBar from "../../components/NavBar";
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

        <div className="service-cards">
          <div className="card">
            <div className="card-image one"></div>
            <p className="card-text">
              <span className="black-text">Real-Time</span> <br />
              <span className="black-text">Health </span>
              <span className="red-text">Monitoring</span>
            </p>
          </div>

          <div className="card">
            <div className="card-image two"></div>
            <p className="card-text">
              <span className="black-text">Interactive </span>
              <span className="red-text">Dashboard</span>
            </p>
          </div>

          <div className="card">
            <div className="card-image three"></div>
            <p className="card-text">
              <span className="black-text">Smart Data </span>
              <span className="red-text">Transmission</span>
            </p>
          </div>

          <div className="card">
            <div className="card-image four"></div>
            <p className="card-text">
              <span className="black-text">Caregiver &amp; </span>
              <span className="red-text">Family Support</span>
            </p>
          </div>
        </div>

        <div className="decorative ellipse-left"></div>
        <div className="decorative ellipse-right"></div>
      </div>
    </div>
  );
};

export default Services;
