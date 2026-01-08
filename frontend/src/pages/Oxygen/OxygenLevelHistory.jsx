import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchVitalsHistory } from "../../api"; // We reuse the same API function
import "./OxygenLevelHistory.css";

const OxygenLevelHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const data = await fetchVitalsHistory(token);
        
        // Format the API data to match the card design
        const formatted = data.map((item) => {
          const dateObj = new Date(item.timestamp);
          
          // 1. Determine Status Text
          let statusLabel = item.risk_level || "Normal";
          
          // 2. Determine CSS Class Name (MUST MATCH CSS EXACTLY)
          // We use 'high', 'abnormal', 'normal' because that's what the CSS expects.
          let statusClass = "normal";

          // If AI says "High Risk" OR oxygen is dangerously low (<90)
          if (statusLabel === "High Risk" ) {
            statusClass = "high";      // <--- CHANGED "risk" TO "high"
            statusLabel = "High Risk"; 
          } 
          // If AI says "Abnormal" OR oxygen is kinda low (90-94)
          else if (statusLabel === "Abnormal" || (item.spo2 >= 90 && item.spo2 < 95)) {
            statusClass = "abnormal"; 
          } 
          else {
            statusClass = "normal"; 
          }

          return {
            status: statusLabel,
            statusClass: statusClass,
            value: `${item.spo2}%`, 
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

  const getStatusType = (riskLevel) => {
    if (riskLevel === "High Risk") return "high";
    if (riskLevel === "Abnormal") return "abnormal";
    return "normal";
    };

  return (
    <Sidebar>
      <div className="oxy-history-main">
        <h2 className="oxy-history-title">Oxygen Level History</h2>
        <p className="oxy-history-description">
          Showing your recent oxygen history
        </p>

        {loading ? (
          <p style={{textAlign: "center", marginTop: "40px", color: "#666"}}>Loading history...</p>
        ) : historyData.length === 0 ? (
          <p style={{textAlign: "center", marginTop: "40px", color: "#666"}}>No history found.</p>
        ) : (
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
        )}
      </div>
    </Sidebar>
  );
};

export default OxygenLevelHistory;