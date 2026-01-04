import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 flex flex-col items-start justify-center w-full max-w-4xl px-6 md:px-12 lg:px-24 py-12 md:py-32">
      <h1 className="text-4xl md:text-[55px] font-light leading-tight">
        Welcome to <span className="text-[#9b3d3d] font-normal">ElderlyCare.Co</span>
      </h1>
      
      <h2 className="text-4xl md:text-[60px] font-bold leading-tight mt-2">
        <span className="text-[#9b3d3d]">Smarter</span> Health,{" "}
        <span className="text-[#9b3d3d]">Safer</span> Aging.
      </h2>
      
      <p className="text-lg md:text-[24px] font-light text-gray-700 max-w-xl mt-6 leading-relaxed">
        A smart and user-friendly AI platform that monitors elderly health
        and empowers informed, safer living.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-10 w-full sm:w-auto">
        <button
          className="bg-[#9b3d3d] hover:bg-[#7c2a2a] text-white text-xl font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg"
          onClick={() => navigate("/Register")}
        >
          Get Started
        </button>
        
        <button
          className="!border-2 !border-solid !border-[#9b3d3d] text-[#9b3d3d] hover:bg-red-50 text-xl font-bold px-8 py-4 rounded-lg transition-colors duration-200"
          onClick={() => navigate("/Services")}
        >
          Services
        </button>
      </div>
    </div>
  );
};

export default HeroSection;