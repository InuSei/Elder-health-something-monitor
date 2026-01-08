import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchVitals } from "../../api";
import "./Dashboard.css";

const Dashboard = () => {
  const [vitals, setVitals] = useState({ heart_rate: 0, spo2: 0 });
  const [loading, setLoading] = useState(true);

  // 1. BACKEND CONNECTION
  useEffect(() => {
    async function loadVitals() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const data = await fetchVitals(token);
        if (data) {
          const heart = data.heart_rate !== undefined ? data.heart_rate : (data.vitals?.[0]?.heart_rate || 0);
          const oxy = data.spo2 !== undefined ? data.spo2 : (data.vitals?.[0]?.spo2 || 0);
          setVitals({ heart_rate: heart, spo2: oxy });
        }
      } catch (err) {
        console.error("Error fetching vitals: ", err);
      } finally {
        setLoading(false);
      }
    }
    loadVitals();
    const interval = setInterval(loadVitals, 2000);
    return () => clearInterval(interval);
  }, []);

  // 2. STATUS LOGIC
  const getStatus = (type, value) => {
    if (!value || loading) return "normal";
    if (type === "heart") {
      if (value < 40 || value > 150) return "highRisk"; // Returns 'highRisk' -> .card-highRisk (Red Panel)
      if (value < 50 || value > 100) return "abnormal"; // Returns 'abnormal' -> .card-abnormal (Yellow Panel)
      return "normal"; 
    } 
    else if (type === "oxygen") {
      if (value < 90) return "highRisk";
      if (value < 95) return "abnormal";
      return "normal";
    }
    return "normal";
  };

  const getLabel = (status) => {
    if (status === "highRisk") return "High Risk";
    if (status === "abnormal") return "Abnormal";
    return "Normal";
  };

  const heartStatus = getStatus("heart", vitals.heart_rate);
  const oxygenStatus = getStatus("oxygen", vitals.spo2);

  return (
    <Sidebar>
      <div className="dashboard-main">
        <div className="cards-row">
          
          {/* HEART RATE CARD - Background Changes Here */}
          <div className={`dashboard-card card-${heartStatus}`}>
            <h2 className="card-title">Heart Rate Level</h2>
            <div className="data-display">
              <div className="icon-container">
                <img src="/heart.png" alt="Heart Icon" />
              </div>
              
              {/* Text color stays standard (Black) */}
              <div className="value-container">
                {vitals.heart_rate > 0 ? vitals.heart_rate : "--"}
              </div>
              <span className="unit-label">bpm</span>
            </div>
            <div className="status-badge">
              Status: {getLabel(heartStatus)}
            </div>
          </div>

          {/* OXYGEN LEVEL CARD - Background Changes Here */}
          <div className={`dashboard-card card-${oxygenStatus}`}>
            <h2 className="card-title">Oxygen Level</h2>
            <div className="data-display">
              <div className="icon-container">
                <img src="/oxygen.png" alt="Oxygen Icon" />
              </div>
              
              {/* Text color stays standard (Black) */}
              <div className="value-container">
                {vitals.spo2 > 0 ? vitals.spo2 : "--"}
              </div>
              <span className="unit-label">%</span>
            </div>
            <div className="status-badge">
               Status: {getLabel(oxygenStatus)}
            </div>
          </div>

        </div>

        {/* LEGEND - Unchanged */}
        <div className="indicators-grid">
          <div className="legend-column">
            <div className="indicator-category-label">Heart Rate</div>
            <div className="indicator-row-visual">
              <div className="legend-swatch normal"></div>
              <span className="level-label">Normal</span>
              <span className="level-value">60–100</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch abnormal"></div>
              <span className="level-label">Abnormal</span>
              <span className="level-value">&lt;50 / &gt;100</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch highRisk"></div>
              <span className="level-label highRisk">High Risk</span>
              <span className="level-value">&lt;40 / &gt;150</span>
            </div>
          </div>
          
          <div className="legend-column">
            <div className="indicator-category-label">Oxygen Level</div>
            <div className="indicator-row-visual">
              <div className="legend-swatch normal"></div>
              <span className="level-label">Normal</span>
              <span className="level-value">95–100%</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch abnormal"></div>
              <span className="level-label">Abnormal</span>
              <span className="level-value">90–94%</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch highRisk"></div>
              <span className="level-label highRisk">High Risk</span>
              <span className="level-value">&lt;90%</span>
            </div>
          </div>
        </div>

      </div>
    </Sidebar>
  );
};

export default Dashboard;