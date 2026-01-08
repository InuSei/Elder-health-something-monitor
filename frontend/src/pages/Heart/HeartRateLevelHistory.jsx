import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchVitalsHistory } from "../../api"; // Import the new function
import "./HeartRateLevelHistory.css";

const HeartRateLevelHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const data = await fetchVitalsHistory(token);

        if (!Array.isArray(data)) {
          console.error("Data is not an array!", data);
          setHistoryData([]);
          return;
      }
        
        // Format the API data to match the card design
        const formatted = data.map((item) => {
          const dateObj = new Date(item.timestamp);
          const hr = parseInt(item.heart_rate);
          
          let statusLabel = "Normal";
          let statusClass = "normal";

          // 1. Critical (Red)
          if (hr < 50 || hr > 120) {
             statusLabel = "High Risk";
             statusClass = "high";
          } 
          // 2. Abnormal (Yellow) -> strict check: <60 or >100
          else if (hr < 60 || hr > 100) {
             statusLabel = "Abnormal";
             statusClass = "abnormal";
          } 
          // 3. Normal (Green) -> 60 to 100
          else {
             statusLabel = "Normal";
             statusClass = "normal";
          }

          return {
            status: item.risk_level || "Normal",
            statusClass: statusClass,
            value: `${item.heart_rate} bpm`,
            date: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            time: dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
          };
        });

        setHistoryData(formatted);
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Sidebar>
      <div className="history-main">
        <h2 className="history-title">Heart Rate History</h2>
        <p className="history-description">
          Showing your recent history
        </p>

        {loading ? (
          <p style={{textAlign: "center", marginTop: "40px", color: "#666"}}>Loading history...</p>
        ) : historyData.length === 0 ? (
          <p style={{textAlign: "center", marginTop: "40px", color: "#666"}}>No history found.</p>
        ) : (
          <div className="history-grid">
            {historyData.map((item, idx) => (
              <div className={`history-card ${item.statusClass}`} key={idx}>
                <div className="history-icons">
                  {/* Calendar/Time Icons */}
                  <span className="icon-time">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#444" strokeWidth="2"/><path d="M10 5v5l3 2" stroke="#444" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                  <span className="icon-date">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="12" rx="2" stroke="#444" strokeWidth="2"/><path d="M3 8h14" stroke="#444" strokeWidth="2"/><circle cx="7" cy="11" r="1" fill="#444"/><circle cx="13" cy="11" r="1" fill="#444"/></svg>
                  </span>
                </div>
                
                {/* Status Badge */}
                <button className={`status-btn ${item.statusClass}`}>
                  {item.status}
                </button>
                
                {/* Value */}
                <div className="history-value">{item.value}</div>
                
                {/* Date Footer */}
                <div className="history-sub">
                  <span>{item.date}</span> <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default HeartRateLevelHistory;