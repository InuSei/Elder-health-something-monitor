import React from "react";
import Sidebar from "../../components/Sidebar";
import "./Explanation.css";

const Explanation = () => (
  <Sidebar>
    <div className="explanation-main">
      <h2 className="explanation-title">Explanation</h2>
      <div className="explanation-cards">
        {/* Heart Rate */}
        <div className="explanation-card">
          <div className="explanation-card-title">Heart Rate</div>
          <div>
            <div className="explanation-subtitle">
              Normal (Adults at rest):
            </div>
            <div className="explanation-text">60–100 bpm</div>
          </div>
          <div>
            <div className="explanation-subtitle">
              Abnormal (Mild concern):
            </div>
            <ul>
              <li>
                Below 50 bpm (bradycardia): May cause dizziness, weakness, or fainting (except in athletes, where it may be normal).
              </li>
              <li>
                Above 100–120 bpm (tachycardia): Could indicate stress, dehydration, infection, or heart rhythm problems.
              </li>
            </ul>
          </div>
          <div>
            <div className="explanation-subtitle">High-Risk:</div>
            <ul>
              <li>
                Below 40 bpm: Risk of inadequate blood flow to organs.
              </li>
              <li>
                Above 150–180 bpm (at rest): Can compromise heart function and oxygen delivery, may require urgent evaluation.
              </li>
            </ul>
          </div>
        </div>
        {/* Oxygen Level */}
        <div className="explanation-card">
          <div className="explanation-card-title">Oxygen Level</div>
          <div>
            <div className="explanation-subtitle">Normal:</div>
            <div className="explanation-text">95–100%</div>
          </div>
          <div>
            <div className="explanation-subtitle">Abnormal (Mild concern):</div>
            <ul>
              <li>
                90–94%: May suggest early hypoxemia (low blood oxygen), often requires monitoring and possibly oxygen support.
              </li>
            </ul>
          </div>
          <div>
            <div className="explanation-subtitle">High-Risk:</div>
            <ul>
              <li>
                Below 90%: Serious concern, indicates hypoxemia that can harm organs.
              </li>
              <li>
                Below 85%: Emergency level—high risk of organ damage, requires immediate medical intervention.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
);

export default Explanation;
