import { useNavigate } from "react-router-dom";
import React from "react";
const Contact = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="_80_95__Contact"
        className="absolute overflow-hidden bg-white shadow-[0.0px_4.0px_4.0px_0.0px_rgba(0,0,0,0.25)] h-[1024.0px] w-full"
      >
        <div
          id="_80_96__Frame_19"
          className="absolute overflow-hidden bg-[rgba(155,61,61,1.00)] h-[50.00px] w-[1440.00px] left-[0.00px] top-[974.00px]"
        ></div>

        <img
          id="_80_97__Ellipse_10"
          src="assets/images/ellipse_10.svg"
          alt="Ellipse_10"
          className="absolute left-[0.00px] top-[115.00px]"
        />
        <img
          id="_83_100__Line_2"
          src="assets/images/line_2.svg"
          alt="Line_2"
          className="absolute left-[100.00px] top-[62.00px]"
        />
        <div
          id="_83_101__Frame_9"
          className="absolute bg-[rgba(172,88,88,0.29)] h-[31.00px] w-[147.00px] top-[calc(50%-305.00px)] flex flex-row justify-center items-center flex-nowrap gap-2.5 px-[25px] py-[15px] rounded-[10px] left-[100.00px]"
        >
          <span
            id="_83_102__CONTACTS"
            className="flex justify-start text-left items-start h-[31.00px] w-[147.00px] relative"
          >
            <span
              className="whitespace-nowrap bg-[rgba(172,88,88,1.00)] bg-clip-text text-transparent not-italic text-[26.0px] font-bold"
              style={{
                fontFamily: "Inter",
              }}
            >
              CONTACTS
            </span>
          </span>
        </div>

        <span
          id="_83_104__ELDERLYCARE_AI"
          onClick={() => navigate("/")}
          className="flex justify-start text-left items-start h-[65.00px] w-[455.00px] absolute cursor-pointer left-[98.00px] top-[299.00px]"
        >
          <span>
            <span
              className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[54.0px] font-bold"
              style={{
                fontFamily: "Inter",
              }}
            >
              ELDERLY
            </span>
            <span
              className="whitespace-nowrap bg-[rgba(172,88,88,1.00)] bg-clip-text text-transparent not-italic text-[54.0px] font-bold"
              style={{
                fontFamily: "Inter",
              }}
            >
              CARE.AI
            </span>
          </span>
        </span>
        <span
          id="_83_106__Caring_Through_Smart"
          className="flex justify-center text-center items-start h-[45.00px] w-[546.00px] absolute left-[98.00px] top-[376.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[36.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Caring Through Smart Technology
          </span>
        </span>
        <span
          id="_83_111__Alcantara__John_Clau"
          className="flex justify-start text-left items-start h-[180.00px] w-[479.00px] absolute left-[100.00px] top-[540.00px]"
        >
          <span
            className="bg-black bg-clip-text text-transparent not-italic text-[36.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Alcantara, John Claude L.
            <br />
            Mamalateo, Maria Fatima M. <br />
            0322-3585@lspu.edu.ph
            <br />
            0322-3507@lspu.edu.ph
          </span>
        </span>
        <span
          id="_83_115__Contact_Privacy_Poli"
          className="flex justify-start text-left items-start h-[151.00px] w-[240.00px] absolute left-[1100.00px] top-[703.00px]"
        >
          <span>
            <span
              className="bg-black bg-clip-text text-transparent not-italic text-[24.0px] font-normal"
              style={{
                fontFamily: "Outfit",
              }}
            >
              Contact <br />
            </span>
            <span
              className="bg-black bg-clip-text text-transparent not-italic text-[24.0px] font-normal"
              style={{
                fontFamily: "Outfit",
              }}
            >
              <br />
            </span>
            <span
              className="bg-black bg-clip-text text-transparent not-italic text-[24.0px] font-normal"
              style={{
                fontFamily: "Outfit",
              }}
            >
              Privacy Policy
              <br />
            </span>
            <span
              className="bg-black bg-clip-text text-transparent not-italic text-[24.0px] font-normal"
              style={{
                fontFamily: "Outfit",
              }}
            >
              <br />
            </span>
            <span
              className="bg-black bg-clip-text text-transparent not-italic text-[24.0px] font-normal"
              style={{
                fontFamily: "Outfit",
              }}
            >
              Terms &amp; Conditions
            </span>
          </span>
        </span>
        <span
          id="_83_109__Caring_Through_Smart"
          className="flex justify-center text-center items-start h-[45.00px] w-[546.00px] absolute left-[98.00px] top-[376.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[36.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Caring Through Smart Technology
          </span>
        </span>
        <span
          id="_83_107__Contact_Details_"
          className="flex justify-center text-center items-start h-[45.00px] w-[263.00px] absolute left-[100.00px] top-[495.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[36.0px] font-semibold"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Contact Details:
          </span>
        </span>
        <span
          id="_83_113__Legal_"
          className="flex justify-center text-center items-start h-[45.00px] w-[101.00px] absolute left-[1119.00px] top-[630.00px]"
        >
          <span
            className="whitespace-nowrap bg-[rgba(155,61,61,1.00)] bg-clip-text text-transparent not-italic text-[36.0px] font-semibold"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Legal:
          </span>
        </span>
      </div>
    </>
  );
};
export default Contact;
