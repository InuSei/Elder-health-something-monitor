import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">

          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNav("/")}
  >
            <img 
              src="/assets/images/1_1.png" 
              alt="Logo" 
              className="h-12 md:h-16 w-auto object-contain" 
            />
  </div>

          <div className="hidden md:flex items-center space-x-12 lg:space-x-24 text-[18px] lg:text-[20px] font-semibold font-sans text-gray-700">
            <span className="cursor-pointer hover:text-[#9b3d3d] transition-colors" onClick={() => navigate("/")}>
      Home
    </span>
            <span className="cursor-pointer hover:text-[#9b3d3d] transition-colors" onClick={() => navigate("/Services")}>
      Services
    </span>
            <span className="cursor-pointer hover:text-[#9b3d3d] transition-colors" onClick={() => navigate("/About")}>
      About
    </span>
            <span className="cursor-pointer hover:text-[#9b3d3d] transition-colors" onClick={() => navigate("/Contact")}>
      Contact
    </span>
  </div>

          <div className="hidden md:block">
  <button
              className="bg-[#9b3d3d] text-white text-[18px] px-8 py-2 rounded-lg hover:bg-[#7c2a2a] transition font-semibold font-sans shadow-sm"
    onClick={() => navigate("/Login")}
  >
              Log In
  </button>
          </div>

          {/* --- Mobile Menu Button (Hamburger) --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#9b3d3d] focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-6 pt-4 pb-8 space-y-4 flex flex-col items-center">
            <span 
              className="text-xl font-semibold text-gray-800 hover:text-[#9b3d3d] cursor-pointer block py-2" 
              onClick={() => handleNav("/")}
            >
              Home
            </span>
            <span 
              className="text-xl font-semibold text-gray-800 hover:text-[#9b3d3d] cursor-pointer block py-2" 
              onClick={() => handleNav("/Services")}
            >
              Services
            </span>
            <span 
              className="text-xl font-semibold text-gray-800 hover:text-[#9b3d3d] cursor-pointer block py-2" 
              onClick={() => handleNav("/About")}
            >
              About
            </span>
            <span 
              className="text-xl font-semibold text-gray-800 hover:text-[#9b3d3d] cursor-pointer block py-2" 
              onClick={() => handleNav("/Contact")}
            >
              Contact
            </span>
            
            <button
              className="w-full mt-4 bg-[#9b3d3d] text-white text-[18px] px-8 py-3 rounded-lg hover:bg-[#7c2a2a] transition font-semibold"
              onClick={() => handleNav("/Login")}
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;