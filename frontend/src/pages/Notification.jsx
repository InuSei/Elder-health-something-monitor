import { useNavigate } from "react-router-dom";
import React from "react";
const Notification = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="_127_26__Notification"
        className="absolute overflow-hidden bg-[rgba(239,239,239,1.00)] h-[1024.0px] w-full"
      >
        <div
          id="_127_27__Rectangle_10"
          className="absolute bg-white shadow-[5.0px_5.0px_50.0px_2.0px_rgba(217,217,217,1.00)] h-[1022.00px] w-[314.00px] left-[0.00px] top-[0.00px]"
        ></div>

        <img
          id="_127_28__Group_4"
          src="assets/images/group_4_1.svg"
          alt="Group_4"
          className="absolute left-[calc(100%_*_0.01)] top-[calc(100%_*_0.03)]"
        />
        <div
          id="_127_32__image_2"
          className="absolute h-[49.00px] w-[49.00px] left-[44.00px] top-[179.00px]"
          style={{
            background: "url(assets/images/null) 100% / cover no-repeat",
          }}
        ></div>

        <span
          id="_127_33__Dashboard"
          className="flex justify-start text-left items-start h-[40.00px] w-[160.00px] absolute left-[106.00px] top-[193.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[32.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Dashboard
          </span>
        </span>

        <span
          id="_127_36__Oxygen_Level"
          onClick={() => navigate("/OxygenLevelHistory")}
          className="flex justify-start text-left items-start h-[40.00px] w-[190.00px] absolute cursor-pointer left-[103.00px] top-[358.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[32.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Oxygen Level
          </span>
        </span>
        <div
          id="_127_37__image_6"
          className="absolute h-[52.00px] w-[49.00px] left-[40.00px] top-[435.00px]"
          style={{
            background: "url(assets/images/null) 100% / cover no-repeat",
          }}
        ></div>

        <span
          id="_127_38__Heart_Rate"
          onClick={() => navigate("/HeartRateLevelHistory")}
          className="flex justify-start text-left items-start h-[40.00px] w-[156.00px] absolute cursor-pointer left-[102.00px] top-[441.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[32.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Heart Rate
          </span>
        </span>
        <div
          id="_127_39__image_11"
          className="absolute h-[49.00px] w-[49.00px] left-[44.00px] top-[532.00px]"
          style={{
            background: "url(assets/images/null) 100% / cover no-repeat",
          }}
        ></div>

        <span
          id="_127_40__Explanation"
          onClick={() => navigate("/Explanation")}
          className="flex justify-start text-left items-start h-[40.00px] w-[169.00px] absolute cursor-pointer left-[103.00px] top-[532.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[32.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Explanation
          </span>
        </span>
        <div
          id="_127_41__image_10"
          className="absolute h-[74.00px] w-[74.00px] left-[32.00px] top-[933.00px]"
          style={{
            background: "url(assets/images/null) 100% / cover no-repeat",
          }}
        ></div>

        <span
          id="_127_42__Log_Out"
          className="flex justify-start text-left items-start h-[40.00px] w-[114.00px] absolute left-[106.00px] top-[950.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[32.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Log Out
          </span>
        </span>

        <div
          id="_127_53__image_9"
          className="absolute h-[65.00px] w-[58.00px] left-[40.00px] top-[345.00px]"
          style={{
            background: "url(assets/images/image_9.png) 100% / cover no-repeat",
          }}
        ></div>

        <div
          id="_127_55__Rectangle_21"
          className="absolute bg-white shadow-[5.0px_5.0px_50.0px_2.0px_rgba(0,0,0,0.25)] h-[829.00px] w-[984.00px] rounded-[30px] left-[375.00px] top-[121.00px]"
        ></div>

        <span
          id="_127_56__Notification"
          className="flex justify-start text-left items-start h-[38.00px] w-[169.00px] absolute left-[363.00px] top-[41.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[30.0px] font-extrabold"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Notification&nbsp;
          </span>
        </span>
        <span
          id="_127_35__Notification"
          className="flex justify-start text-left items-start h-[40.00px] w-[165.00px] absolute left-[103.00px] top-[278.00px]"
        >
          <span
            className="whitespace-nowrap bg-black bg-clip-text text-transparent not-italic text-[32.0px] font-light"
            style={{
              fontFamily: "Outfit",
            }}
          >
            Notification
          </span>
        </span>
        <div
          id="_127_51__image_4"
          className="absolute h-[42.00px] w-[42.00px] left-[40.00px] top-[276.00px]"
          style={{
            background: "url(assets/images/image_4.png) 100% / cover no-repeat",
          }}
        ></div>

        <div
          id="_127_58__Rectangle_22"
          className="absolute bg-[rgba(231,207,207,0.31)] h-[83.00px] w-[316.00px] left-[0.00px] top-[256.00px]"
        ></div>
      </div>
    </>
  );
};
export default Notification;
