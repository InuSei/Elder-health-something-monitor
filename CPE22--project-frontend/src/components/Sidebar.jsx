import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Placeholder user hook for demo
function useUser() {
  return {
    firstName: "FirstName",
    lastName: "LastName",
    avatar: "assets/images/name.png",
    phone: "09XX-XXXXXXX",
    birthday: "YYYY-MM-DD",
  };
}

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const user = useUser();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 relative">
    
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-700"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full bg-white shadow z-50 flex flex-col transition-transform duration-300
        ${collapsed ? "w-24" : "w-80"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        overflow-y-auto /* Sidebar itself can scroll if menu is long */
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
            <img src="assets/images/home.png" alt="Dashboard" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Dashboard</span>}
          </button>
           <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/Notification")}>
            <img src="assets/images/bell.png" alt="Notification" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Notification</span>}
          </button>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/OxygenLevelHistory")}>
            <img src="assets/images/oxygen.png" alt="Oxygen Level" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Oxygen Level</span>}
          </button>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/HeartRateLevelHistory")}>
            <img src="assets/images/heart.png" alt="Heart Rate" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Heart Rate</span>}
          </button>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl text-xl ${collapsed ? "justify-center" : ""}`} onClick={() => navigate("/Explanation")}>
            <img src="assets/images/info.png" alt="Explanation" className="w-12 h-12" />
            {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Explanation</span>}
          </button>
         </nav>
          <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl mb-3 text-xl ${collapsed ? "justify-center" : ""}`} style={{ marginTop: "auto" }} onClick={() => navigate("/")}>
          <img src="assets/images/image_10.png" alt="Log Out" className="w-12 h-12" />
          {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Log Out</span>}
        </button>
      </aside>

      <div className={`
        flex-1 flex flex-col transition-all duration-200 
        ml-0
        ${collapsed ? "md:ml-24" : "md:ml-80"}
        h-screen /* Force full height */
      `}>
        
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

              <form className="flex flex-col gap-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">First Name</label>
                    <input className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" defaultValue={user.firstName} name="firstName" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">Last Name</label>
                    <input className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" defaultValue={user.lastName} name="lastName" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">Phone Number</label>
                    <input className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" defaultValue={user.phone} name="phone" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold ml-1 mb-1">Birthday</label>
                    <input className="p-2 rounded-lg bg-gray-200 text-black border-none outline-none" defaultValue={user.birthday} name="birthday" />
                  </div>
                </div>

                <div className="flex flex-col">
                   <label className="text-sm font-bold ml-1 mb-1">Device</label>
                   <div className="flex flex-col md:flex-row gap-3">
                     <input 
                       className="flex-1 p-2 rounded-lg bg-gray-200 text-black border-none outline-none" 
                       placeholder="Enter device ID" 
                       name="device" 
                     />
                     <button 
                       type="button" 
                       className="bg-red-800/80 hover:bg-red-800 text-white text-sm px-4 py-2 rounded-lg border border-white/20 shadow-sm"
                     >
                       Add Device
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