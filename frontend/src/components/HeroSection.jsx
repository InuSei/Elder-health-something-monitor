import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-6 px-24 py-32 relative">
      <h1 className="text-[55px] font-light">
        Welcome to <span className="text-[#9b3d3d]">ElderlyCare.Co</span>
      </h1>
      <h2 className="text-[60px] font-bold">
        <span className="text-[#9b3d3d]">Smarter</span> Health,{" "}
        <span className="text-[#9b3d3d]">Safer</span> Aging.
      </h2>
      <p className="text-[24px] font-light max-w-2xl">
        A smart and user-friendly AI platform that monitors elderly health
        and empowers informed, safer living.
      </p>
      <div className="flex gap-6 mt-4">
        <button
          className="bg-[#9b3d3d] text-white font-bold px-8 py-4 rounded"
          onClick={() => navigate("/Register")}
        >
          Get Started
        </button>
        <button
          className="border border-[#9b3d3dff] text-[#9b3d3d] font-bold px-8 py-4 rounded"
          onClick={() => navigate("/Services")}
        >
          Services
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
