import React from "react";
import Sidebar from "../../components/Sidebar";
import "./Notification.css";

const Notification = () => {
  return (
    <Sidebar>
      <div className="notification-main">

        {/* Decorative avatar or other content as needed */}
        <div
          className="notification-avatar"
          style={{
            background: "url(assets/images/null) 100% / cover no-repeat",
          }}
        ></div>

        <h2 className="notification-title">Notification</h2>

        {/* Example notification card (you can iterate real data here) */}
        <div className="notification-card">
          <div
            className="notification-icon"
            style={{
              background: "url(assets/images/image_4.png) 100% / cover no-repeat",
            }}
          ></div>
          <div className="notification-detail">
            <div className="notification-label">Oxygen Level Low</div>
            <div className="notification-description">
              Your oxygen level dropped below 90% at 08:30 AM.
            </div>
          </div>
        </div>

        {/* Add more notification cards below as needed */}
      </div>
    </Sidebar>
  );
};

export default Notification;
