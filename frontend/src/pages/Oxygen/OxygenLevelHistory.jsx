import React from "react";
import Sidebar from "../../components/Sidebar";
import "./OxygenLevelHistory.css";

const historyData = [
  { status: "Normal", statusClass: "normal", value: "98%", date: "Oct 18, 2025", time: "09:00 AM" },
  { status: "High", statusClass: "high", value: "100%", date: "Oct 17, 2025", time: "11:30 AM" },
  { status: "Abnormal", statusClass: "abnormal", value: "91%", date: "Oct 16, 2025", time: "6:40 PM" },
  { status: "Normal", statusClass: "normal", value: "97%", date: "Oct 15, 2025", time: "02:36 PM" },
  { status: "Abnormal", statusClass: "abnormal", value: "92%", date: "Oct 13, 2025", time: "10:12 AM" },
  { status: "High", statusClass: "high", value: "85%", date: "Oct 12, 2025", time: "08:20 AM" },
  { status: "Normal", statusClass: "normal", value: "97%", date: "Oct 11, 2025", time: "04:13 PM" },
  { status: "Normal", statusClass: "normal", value: "96%", date: "Oct 10, 2025", time: "03:21 PM" },
  { status: "Abnormal", statusClass: "abnormal", value: "93%", date: "Oct 9, 2025", time: "07:17 AM" },
  { status: "High", statusClass: "high", value: "81%", date: "Oct 8, 2025", time: "12:56 PM" },
  { status: "Normal", statusClass: "normal", value: "99%", date: "Oct 7, 2025", time: "09:55 AM" },
  { status: "Abnormal", statusClass: "abnormal", value: "88%", date: "Oct 6, 2025", time: "08:40 AM" },
];

const OxygenLevelHistory = () => {
  return (
    <Sidebar>
      <div className="oxy-history-main">
        <h2 className="oxy-history-title">Oxygen Level History</h2>
        <p className="oxy-history-description">
          Showing your all histories with a clear view
        </p>
        <div className="oxy-history-grid">
          {historyData.map((item, idx) => (
            <div className={`oxy-history-card2 ${item.statusClass}`} key={idx}>
              <div className="oxy-history-icons">
                <span className="icon-time" title="Time">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#444" strokeWidth="2"/><path d="M10 5v5l3 2" stroke="#444" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
                <span className="icon-date" title="Date">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="12" rx="2" stroke="#444" strokeWidth="2"/><path d="M3 8h14" stroke="#444" strokeWidth="2"/><circle cx="7" cy="11" r="1" fill="#444"/><circle cx="13" cy="11" r="1" fill="#444"/></svg>
                </span>
              </div>
              <button className={`status-btn ${item.statusClass}`}>
                {item.status}
              </button>
              <div className="oxy-history-value">{item.value}</div>
              <div className="oxy-history-sub">
                <span>{item.date}</span> <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default OxygenLevelHistory;
