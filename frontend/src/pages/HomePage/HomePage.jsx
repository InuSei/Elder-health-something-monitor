import React from "react";
import NavBar from "../../components/NavBar";
import HeroSection from "../../components/HeroSection"; 
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <NavBar />

      <main className="main-content">
        <HeroSection />

        <div className="bg-visuals">
          <div className="bg-image"></div>
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;