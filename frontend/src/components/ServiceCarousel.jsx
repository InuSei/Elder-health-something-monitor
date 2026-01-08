import React, { useState } from "react";

const cardData = [
  { image: "/4_1.png", text: (<><span className="text-black font-bold">Real-Time</span><br/><span className="text-black font-bold">Health </span><span className="text-[rgba(155,61,61,1)] font-bold">Monitoring</span></>) },
  { image: "/9.png", text: (<><span className="text-black font-bold">Interactive </span><br/><span className="text-[rgba(155,61,61,1)] font-bold">Dashboard</span></>) },
  { image: "/6.png", text: (<><span className="text-black font-bold">Smart Data </span><br/><span className="text-[rgba(155,61,61,1)] font-bold">Transmission</span></>) },
  { image: "/8.png", text: (<><span className="text-black font-bold">Caregiver &amp; </span><span className="text-[rgba(155,61,61,1)] font-bold">Family Support</span></>) },
];

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % cardData.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  };

  return (
    <div className="w-full flex flex-col items-center md:items-start">
      
      <div className="relative inline-flex items-center gap-2 sm:gap-4 py-4 w-full max-w-[600px]">
        
      {/* Prev Button */}
      <button
          onClick={prevSlide}
          className="flex-shrink-0 bg-[#ac5858] text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center hover:bg-[#9b3d3d] transition text-xl sm:text-2xl shadow-md z-10"
        aria-label="Previous"
      >
        &#8592;
      </button>

        <div className="overflow-hidden bg-white rounded-2xl border-2 border-[#9b3d3d] w-full max-w-[500px] h-[220px] relative">
          
          {/* Sliding Track */}
        <div
            className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
              width: `${cardData.length * 100}%`, 
              
              transform: `translateX(-${index * (100 / cardData.length)}%)`
          }}
        >
          {cardData.map((item, idx) => (
            <div
              key={idx}
                className="h-full flex items-center justify-center px-4"
              style={{
                  width: `${100 / cardData.length}%` 
              }}
            >
                <div className="flex items-center justify-center w-full max-w-[400px]">
              <img
                src={item.image}
                alt=""
                    className="w-20 h-20 sm:w-32 sm:h-32 object-contain mr-4 sm:mr-7 select-none"
                draggable={false}
              />
                  <p className="font-inter text-xl sm:text-[24px] md:text-[28px] font-bold text-left leading-tight select-none">
                {item.text}
              </p>
            </div>
              </div>
          ))}
        </div>
      </div>
      
      {/* Next Button */}
      <button
          onClick={nextSlide}
          className="flex-shrink-0 bg-[#ac5858] text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center hover:bg-[#9b3d3d] transition text-xl sm:text-2xl shadow-md z-10"
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
    </div>
  );
}