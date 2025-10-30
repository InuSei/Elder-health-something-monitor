import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchVitals } from "../../api";
import "./Dashboard.css";

const Dashboard = () => {
  const [vitals, setVitals] = useState({heart_rate: "---", spo2: "---"});

  useEffect(() => {
    async function  loadVitals() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;
        const data = await fetchVitals(token);
        const latest = data.vitals[0];
        setVitals({
          heart_rate: latest.heart_rate,
          spo2: latest.spo2
        });
      }
      catch(err){
        console.error("Error fetching vitals: ", err);
      }
    }

    loadVitas();
    const interval = setInterval(loadVitals, 2000); // refress every 2 seconds
    return () => clearInterval(interval);
  }, [])


  return (
    <Sidebar>
      <div className="dashboard-main">
        <div className="cards-row">
          <div className="dashboard-card">
            <h2 className="card-title">Heart Rate Level</h2>
            <p className="card-value">{vitals.heart_rate} BPM</p>
          </div>
          <div className="dashboard-card">
            <h2 className="card-title">Oxygen Level</h2>
            <p className="card-value">{vitals.spo2} %</p>
          </div>
        </div>

        {/* Indicators block (matching the example image) */}
        <div className="indicators-grid">
          <div>
            <div className="indicator-category-label">Heart Rate Level</div>
            <div className="indicator-row-visual">
              <div className="legend-swatch normal"></div>
              <span className="level-label normal">Normal</span>
              <span className="level-value">60–100 bpm</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch abnormal"></div>
              <span className="level-label abnormal">Abnormal</span>
              <span className="level-value">&lt;50 or &gt;100–120 bpm</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch risk"></div>
              <span className="level-label risk">High Risk</span>
              <span className="level-value">&lt;40 or &gt;150–180 bpm</span>
            </div>
          </div>
          <div>
            <div className="indicator-category-label">Oxygen Level</div>
            <div className="indicator-row-visual">
              <div className="legend-swatch normal"></div>
              <span className="level-label normal">Normal</span>
              <span className="level-value">95–100%</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch abnormal"></div>
              <span className="level-label abnormal">Abnormal</span>
              <span className="level-value">90–94%</span>
            </div>
            <div className="indicator-row-visual">
              <div className="legend-swatch risk"></div>
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
