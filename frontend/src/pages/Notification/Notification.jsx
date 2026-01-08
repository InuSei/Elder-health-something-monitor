import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchNotifications } from "../../api";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data when page loads
  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const data = await fetchNotifications(token);
        setNotifications(data);
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  
  return (
    <Sidebar>
      <div className="notification-main">

        {/* Header Avatar (Keep your existing design) */}
        <div
          className="notification-avatar"
          style={{
            background: "url(assets/images/null) 100% / cover no-repeat",
          }}
        ></div>

        <h2 className="notification-title">Notifications</h2>

        {/* 2. Loading State */}
        {loading ? (
          <p style={{ textAlign: "center", color: "#666", marginTop: "20px" }}>Loading alerts...</p>
        ) : notifications.length === 0 ? (
          <div className="notification-card" style={{ justifyContent: "center" }}>
            <p style={{ margin: 0, color: "#888" }}>No new notifications.</p>
          </div>
        ) : (
          /* 3. Render the list of alerts */
          <div className="notification-list" style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`notification-card ${notif.type}`} // Adds 'critical' or 'warning' class for CSS styling
              >
                {/* Dynamic Icon */}
                <div className="notification-icon">
                  {notif.type === "critical" ? "🚨" : "⚠️"}
                </div>
                
                <div className="notification-detail">
                  <div className="notification-label">{notif.title}</div>
                  <div className="notification-description">
                    {notif.message}
                  </div>
                  <div className="notification-time" style={{ fontSize: "0.8rem", color: "#888", marginTop: "5px" }}>
                    {new Date(notif.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </Sidebar>
  );
};

export default Notification;