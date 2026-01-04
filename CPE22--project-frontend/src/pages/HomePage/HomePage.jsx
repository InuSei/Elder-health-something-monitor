import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import HeroSection from "../../components/HeroSection"; 
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

  return (
    <div className="h-screen w-full bg-white overflow-x-hidden">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-72 px-24 space-y-2 relative z-10">
        <h1 className="text-[55px] font-light">
          <span className="gradient-black">Welcome to </span>
          <span className="gradient-red">ElderlyCare.Co</span>
        </h1>

        <h2 className="text-[60px] font-bold">
          <span className="gradient-red">Smarter</span> Health,{" "}
          <span className="gradient-red">Safer</span> Aging.
        </h2>

        <p className="text-[24px] font-light text-gray-700 max-w-3xl">
          A smart and user-friendly AI platform that monitors elderly health and empowers informed,
          safer living.
        </p>

        {/* Buttons */}
        <div className="flex gap-20">
          <button className="btn-primary" onClick={() => navigate("/Register")}>
            Get Started
          </button>
          <button className="btn-outline" onClick={() => navigate("/Services")}>
            Services
          </button>
        </div>
      </section>

      {/* Design */}
      <div
        className="img-blur"
        style={{
          backgroundImage: "url(/assets/images/2_1.png)",
          top: "300px",
          left: "1200px",
          width: "650px",
          height: "400px",
        }}
      ></div>

      <svg className="ring-svg ring1" viewBox="0 0 500 500">
  <circle cx="250" cy="250" r="200"/>
</svg>
<svg className="ring-svg ring2" viewBox="0 0 500 500">
  <circle cx="250" cy="250" r="200"/>
</svg>
<svg className="ring-svg ring3" viewBox="0 0 500 500">
  <circle cx="250" cy="250" r="200"/>
</svg>
    </div>
  );
};

export default HomePage;
