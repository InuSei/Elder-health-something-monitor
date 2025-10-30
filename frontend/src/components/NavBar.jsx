import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center px-8 py-6 bg-white shadow-md fixed w-full top-0 left-0 z-50">
  {/* Logo */}
  <div
    className="flex items-center gap-2 cursor-pointer flex-shrink-0"
    onClick={() => navigate("/")}
  >
    <img src="/assets/images/1_1.png" alt="Logo" className="h-16 w-48 object-contain" />
  </div>

  {/* Links (centered/flex-grow) */}
  <div className="flex gap-24 text-[20px] font-semibold font-sans items-center flex-1 justify-center">
    <span className="cursor-pointer hover:text-[#9b3d3d]" onClick={() => navigate("/")}>
      Home
    </span>
    <span className="cursor-pointer hover:text-[#9b3d3d]" onClick={() => navigate("/Services")}>
      Services
    </span>
    <span className="cursor-pointer hover:text-[#9b3d3d]" onClick={() => navigate("/About")}>
      About
    </span>
    <span className="cursor-pointer hover:text-[#9b3d3d]" onClick={() => navigate("/Contact")}>
      Contact
    </span>
  </div>

  {/* Register Button (right-aligned) */}
  <button
    className="bg-[#9b3d3d] text-white text-[18px] px-8 py-2 rounded-lg hover:bg-[#7c2a2a] transition font-semibold font-sans mr-20"
    onClick={() => navigate("/Register")}
  >
    Register
  </button>
</nav>

  );
};

export default NavBar;
