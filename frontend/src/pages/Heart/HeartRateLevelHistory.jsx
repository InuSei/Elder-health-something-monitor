import React from "react";
import Sidebar from "../../components/Sidebar";
import "./HeartRateLevelHistory.css";

const historyData = [
  { status: "Normal", statusClass: "normal", value: "72 bpm", date: "Oct 18, 2025", time: "09:00 AM" },
  { status: "High", statusClass: "high", value: "112 bpm", date: "Oct 17, 2025", time: "11:30 AM" },
  { status: "Abnormal", statusClass: "abnormal", value: "45 bpm", date: "Oct 16, 2025", time: "6:40 PM" },
  { status: "Normal", statusClass: "normal", value: "80 bpm", date: "Oct 15, 2025", time: "02:36 PM" },
  { status: "Abnormal", statusClass: "abnormal", value: "51 bpm", date: "Oct 13, 2025", time: "10:12 AM" },
  { status: "High", statusClass: "high", value: "105 bpm", date: "Oct 12, 2025", time: "08:20 AM" },
  { status: "Normal", statusClass: "normal", value: "78 bpm", date: "Oct 11, 2025", time: "04:13 PM" },
  { status: "Normal", statusClass: "normal", value: "75 bpm", date: "Oct 10, 2025", time: "03:21 PM" },
  { status: "Abnormal", statusClass: "abnormal", value: "44 bpm", date: "Oct 9, 2025", time: "07:17 AM" },
  { status: "High", statusClass: "high", value: "124 bpm", date: "Oct 8, 2025", time: "12:56 PM" },
  { status: "Normal", statusClass: "normal", value: "76 bpm", date: "Oct 7, 2025", time: "09:55 AM" },
  { status: "Abnormal", statusClass: "abnormal", value: "60 bpm", date: "Oct 6, 2025", time: "08:40 AM" },
];

const HeartRateLevelHistory = () => {
  return (
    <Sidebar>
      <div className="history-main">
        <h2 className="history-title">Heart Rate History</h2>
        <p className="history-description">
          Showing your all histories with a clear view
        </p>
        <div className="history-grid">
          {historyData.map((item, idx) => (
            <div className={`history-card ${item.statusClass}`} key={idx}>
              <div className="history-icons">
                <span className="icon-time" title="Time">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="9" stroke="#444" strokeWidth="2"/>
                    <path d="M10 5v5l3 2" stroke="#444" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="icon-date" title="Date">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <rect x="3" y="5" width="14" height="12" rx="2" stroke="#444" strokeWidth="2"/>
                    <path d="M3 8h14" stroke="#444" strokeWidth="2"/>
                    <circle cx="7" cy="11" r="1" fill="#444"/>
                    <circle cx="13" cy="11" r="1" fill="#444"/>
                  </svg>
                </span>
              </div>
              <button className={`status-btn ${item.statusClass}`}>
                {item.status}
              </button>
              <div className="history-value">{item.value}</div>
              <div className="history-sub">
                <span>{item.date}</span> <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default HeartRateLevelHistory;
