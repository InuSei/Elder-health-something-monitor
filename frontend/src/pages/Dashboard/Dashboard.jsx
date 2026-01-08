import React, { useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar";
import { fetchVitals } from "../../api";
import "./Dashboard.css";

const Dashboard = () => {
  const [vitals, setVitals] = useState({heart_rate: "---", spo2: "---"});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function  loadVitals() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
           navigate("/", { replace: true }); 
           return;
        }

        const data = await fetchVitals(token);
        // Check if vitals exist and the array has items
        if (data && data.heart_rate !== undefined) {
          setVitals({
            heart_rate: data.heart_rate,
            spo2: data.spo2
          });
        } 
        // Fallback: If your backend DOES return { vitals: [...] }
        else if (data && data.vitals && data.vitals.length > 0) {
           const latest = data.vitals[0];
           setVitals({
             heart_rate: latest.heart_rate,
             spo2: latest.spo2
           });
        }
  }
      catch(err){
        console.error("Error fetching vitals: ", err);
      }
      finally {
        setLoading(false);
      }
    }

    loadVitals();
    const interval = setInterval(loadVitals, 2000); // refress every 2 seconds
    return () => clearInterval(interval);
  }, [])

const getCardStatus = (type, value) => {
    if (loading || value === 0) return ""; // Default white if loading

    if (type === "heart") {
      // Normal: 60-100
      if (value >= 60 && value <= 100) return "card-normal";
      // Abnormal: 50-59 OR 101-120
      if ((value >= 50 && value < 60) || (value > 100 && value <= 120)) return "card-abnormal";
      // Risk: <50 OR >120
      return "card-risk";
    }
    
    if (type === "oxygen") {
      // Normal: 95-100
      if (value >= 95) return "card-normal";
      // Abnormal: 90-94
      if (value >= 90 && value < 95) return "card-abnormal";
      // Risk: <90
      return "card-risk";
    }
    return "";
  };

  return (
    <Sidebar>
      <div className="dashboard-main">
        <div className="cards-row">
          <div className={`dashboard-card ${getCardStatus("heart", vitals.heart_rate)}`}>
            <h2 className="card-title">Heart Rate Level</h2>
            <div className="value-display">
              <span className="value-number">
                {vitals.heart_rate > 0 ? vitals.heart_rate : "---"}
              </span>
              <span className="value-unit"> bpm</span>
            </div>
          </div>
          <div className={`dashboard-card ${getCardStatus("oxygen", vitals.spo2)}`}>
            <h2 className="card-title">Oxygen Level</h2>
            <div className="value-display">
              <span className="value-number">
                {vitals.spo2 > 0 ? vitals.spo2 : "---"}
              </span>
              <span className="value-unit"> %</span>
            </div>
          </div>
        </div>
        {/* Indicators block (matching the example image) */}
        <div className="indicators-grid">
          <div>
            <div className="indicator-category-label">Heart Rate Level</div>
            <div className="indicator-row-visual">
              <div className="legend-swatch normal" style={{background: '#e3f9e5', border: '1px solid #c1eac5'}}></div>
              <span className="level-label normal">Normal</span>
              <span className="level-value">60–100 bpm</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch abnormal" style={{background: '#fff8e1', border: '1px solid #ffe0b2'}}></div>
              <span className="level-label abnormal">Abnormal</span>
              <span className="level-value">&lt;50 or &gt;100–120 bpm</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch risk" style={{background: '#ffebee', border: '1px solid #ffcdd2'}}></div>
              <span className="level-label risk">High Risk</span>
              <span className="level-value">&lt;40 or &gt;150–180 bpm</span>
            </div>
          </div>
          <div>
            <div className="indicator-category-label">Oxygen Level</div>
            <div className="indicator-row-visual">
              <div className="legend-swatch normal" style={{background: '#e3f9e5', border: '1px solid #c1eac5'}}></div>
              <span className="level-label normal">Normal</span>
              <span className="level-value">95–100%</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch abnormal" style={{background: '#fff8e1', border: '1px solid #ffe0b2'}}></div>
              <span className="level-label abnormal">Abnormal</span>
              <span className="level-value">90–94%</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch risk" style={{background: '#ffebee', border: '1px solid #ffcdd2'}}></div>
              <span className="level-label risk">High Risk</span>
              <span className="level-value">&lt;90% (critical &lt;85%)</span>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
export default Dashboard;
