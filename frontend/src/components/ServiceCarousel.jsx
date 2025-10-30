import React, { useState } from "react";

const CARD_WIDTH = 500;

const cardData = [
  { image: "./assets/images/4_1.png", text: (<><span className="text-black font-bold">Real-Time</span><br/><span className="text-black font-bold">Health </span><span className="text-[rgba(155,61,61,1)] font-bold">Monitoring</span></>) },
  { image: "./assets/images/9.png", text: (<><span className="text-black font-bold">Interactive </span><br/><span className="text-[rgba(155,61,61,1)] font-bold">Dashboard</span></>) },
  { image: "./assets/images/6.png", text: (<><span className="text-black font-bold">Smart Data </span><br/><span className="text-[rgba(155,61,61,1)] font-bold">Transmission</span></>) },
  { image: "./assets/images/8.png", text: (<><span className="text-black font-bold">Caregiver &amp; </span><span className="text-[rgba(155,61,61,1)] font-bold">Family Support</span></>) },
];

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);

  return (
    <div
      className="absolute"
      style={{
        top: "550px",
        left: "651px",
        width: `${CARD_WIDTH + 110}px`, // + extra for buttons at sides (55px each)
        height: "240px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Prev Button */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + cardData.length) % cardData.length)}
        className="bg-[#ac5858] text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-[#9b3d3d] transition text-2xl mr-2"
        aria-label="Previous"
        style={{ zIndex: 2 }}
      >
        &#8592;
      </button>

      {/* Carousel Window */}
      <div
        className="overflow-hidden flex items-center"
        style={{
          width: `${CARD_WIDTH}px`,
          height: "220px",
          borderRadius: "1rem",
          border: "2px solid #9b3d3d",
          background: "#fff",
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${cardData.length * CARD_WIDTH}px`,
            transform: `translateX(-${index * CARD_WIDTH}px)`, // left when next, standard
            height: "220px",
          }}
        >
          {cardData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center flex-shrink-0 w-[500px] h-[220px] bg-white"
              style={{
                height: "220px",
                width: `${CARD_WIDTH}px`,
              }}
            >
              <img
                src={item.image}
                alt=""
                className="w-32 h-32 object-contain mr-7"
                draggable={false}
              />
              <p className="font-inter text-[28px] font-bold text-left">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Next Button */}
      <button
        onClick={() => setIndex((prev) => (prev + 1) % cardData.length)}
        className="bg-[#ac5858] text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-[#9b3d3d] transition text-2xl ml-2"
        aria-label="Next"
        style={{ zIndex: 2 }}
      >
        &#8594;
      </button>
    </div>
  );
}
