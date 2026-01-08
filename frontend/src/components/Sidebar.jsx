import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile, claimDevice } from "../api"; // Importing your new API functions

// --- 1. USER HOOK (Refactored to use api.jsx) ---
function useUser() {
  const [user, setUser] = useState({
    firstName: "Loading...",
    lastName: "",
    avatar: "assets/images/name.png",
    phone: "",
    birthday: "",
    device_id: "",
  });

  const refreshUser = async () => {
    const token = localStorage.getItem("access_token");

    console.log("MY TOKEN IS:", token);

    if (!token) 
      { 
        setUser(prev => ({ ...prev, firstName: "Guest" })); 
        return;
      }       

    try {
      // Uses the clean function from api.jsx
      const data = await fetchUserProfile(token);
      
      setUser({
        firstName: data.first_name || "User",
        lastName: data.last_name || "",
        avatar: "assets/images/name.png",
        phone: data.phone_number || "", // Ensure this matches your backend key (phone vs phone_number)
        birthday: data.birthday || "",
        device_id: data.device_id || "",
      });
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return { user, setUser, refreshUser };
}

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, refreshUser } = useUser();
  
  // Form State
  const [formData, setFormData] = useState({});
  const [deviceInput, setDeviceInput] = useState("");

  // Populate form when modal opens
  useEffect(() => {
    if (showEditModal) {
      setFormData({
        first_name: user.firstName,
        last_name: user.lastName,
        phone_number: user.phone,
        birthday: user.birthday,
      });
      setDeviceInput(user.device_id);
    }
  }, [showEditModal, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- CLAIM DEVICE ACTION ---
  const handleClaimDevice = async () => {
    const token = localStorage.getItem("access_token");
    if (!deviceInput) return alert("Please enter a Device ID");

    try {
      // Uses api.jsx function
      await claimDevice(token, deviceInput);
      alert("Device claimed successfully!");
      refreshUser(); // Update UI immediately
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // --- SAVE PROFILE ACTION ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      // Uses api.jsx function
      await updateUserProfile(token, formData);
      alert("Profile updated!");
      setShowEditModal(false);
      refreshUser(); // Update UI immediately
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 relative">
      
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-700"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white shadow z-50 flex flex-col transition-transform duration-300
        ${collapsed ? "w-24" : "w-80"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        overflow-y-auto
      `}>

        <div className="flex items-center justify-between px-6 py-5">
          <img
            src={collapsed ? "assets/images/1-1.png" : "assets/images/1_1.png"}
            alt="Logo"
            className={collapsed ? "h-12 mx-auto transition-all duration-200" : "h-16 transition-all duration-200"}
          />
          <button
            className="hidden md:flex -mt-4 mb-0 ml-6 flex-col justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="w-8 h-2 rounded bg-black mb-1"></span>
            <span className="w-8 h-2 rounded bg-black mb-1"></span>
            <span className="w-8 h-2 rounded bg-black"></span>
          </button>
        </div>

        <nav className="flex flex-col mt-10 gap-3 flex-1 overflow-y-auto">
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/Dashboard")}>
            <img src="home.png" alt="Dashboard" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Dashboard</span>}
          </button>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/Notification")}>
            <img src="bell.png" alt="Notification" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Notification</span>}
          </button>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/OxygenLevelHistory")}>
            <img src="oxygen.png" alt="Oxygen Level" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Oxygen Level</span>}
          </button>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/HeartRateLevelHistory")}>
            <img src="heart.png" alt="Heart Rate" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Heart Rate</span>}
          </button>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/Explanation")}>
            <img src="info.png" alt="Explanation" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Explanation</span>}
          </button>
        </nav>
        
        <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl mb-3 text-xl ${collapsed ? "justify-center" : ""}`} style={{ marginTop: "auto" }} onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/", { replace: true });
        }}>
          <img src="image_10.png" alt="Log Out" className="w-12 h-12" />
          {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Log Out</span>}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className={`
        flex-1 flex flex-col transition-all duration-200 
        ml-0
        ${collapsed ? "md:ml-24" : "md:ml-80"}
        h-screen
      `}>
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 h-16 bg-white flex items-center justify-end px-12 shadow w-full flex-shrink-0">
          <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full mr-4" />
          <button
            className="font-bold text-lg text-gray-800 hover:underline cursor-pointer mr-0 md:mr-16"
            onClick={() => setShowEditModal(true)}
          >
            {user.firstName} {user.lastName}
          </button>
        </div>

        <main className="flex-1 flex flex-col p-8 overflow-y-auto">
          {children}
        </main>

        {/* --- EDIT MODAL --- */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-red-900/95 rounded-2xl shadow-xl p-8 w-full max-w-lg flex flex-col text-black relative mx-4 border border-red-800">
              
              <button
                className="absolute top-4 right-4 text-2xl text-white/70 hover:text-white"
                onClick={() => setShowEditModal(false)}
                aria-label="Close"
              >&times;</button>
              
              <h3 className="text-xl font-bold mb-6 text-black/80">Edit Information</h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                   <img src={user.avatar} alt="" className="w-full h-full object-cover"/>
                </div>
                <div>
                  <div className="font-extrabold text-2xl text-black">{user.firstName}</div>
                  <div className="font-bold text-xl text-black/70">{user.lastName}</div>
                </div>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSaveProfile}>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">First Name</label>
                    <input 
                      className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" 
                      value={formData.first_name || ""} 
                      name="first_name" 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">Last Name</label>
                    <input 
                      className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" 
                      value={formData.last_name || ""} 
                      name="last_name" 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">Phone Number</label>
                    <input 
                      className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" 
                      value={formData.phone_number || ""} 
                      name="phone_number" 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">Birthday</label>
                    <input 
                      className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" 
                      value={formData.birthday || ""} 
                      name="birthday" 
                      onChange={handleInputChange} 
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                   <label className="text-sm font-bold ml-1 mb-1">Device ID</label>
                   <div className="flex flex-col md:flex-row gap-3">
                     <input 
                       className="flex-1 p-2 rounded-lg bg-gray-200 text-black border-none outline-none" 
                       placeholder="Enter device ID" 
                       value={deviceInput}
                       onChange={(e) => setDeviceInput(e.target.value)}
                     />
                     <button 
                       type="button" 
                       onClick={handleClaimDevice}
                       className="bg-red-800/80 hover:bg-red-800 text-white text-sm px-4 py-2 rounded-lg border border-white/20 shadow-sm transition-colors"
                     >
                       {user.device_id ? "Update Device" : "Add Device"}
                     </button>
                   </div>
                </div>

                <div className="flex justify-between mt-6 px-4">
                  <button 
                    type="button" 
                    className="bg-transparent border border-white/40 text-white/80 px-8 py-2 rounded-xl hover:bg-white/10 transition"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-red-800 text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:bg-red-900 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;