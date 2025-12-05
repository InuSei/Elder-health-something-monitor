import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Placeholder user hook; you will fetch and provide real data here
function useUser() {
  // Replace below with your user fetch (context, Redux, SWR, etc)
  return {
    firstName: "FirstName",
    lastName: "LastName",
    avatar: "assets/images/name.png",
    phone: "09XX-XXXXXXX",
    birthday: "YYYY-MM-DD",
    // add more fields as needed
  };
}

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const user = useUser(); // <-- replace with your real user hook/data

  // Event handler placeholder to save user info to database
  function handleSave(e) {
    e.preventDefault();
    // TODO: send updated data to backend/database here
    setShowEditModal(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white shadow z-20 flex flex-col transition-all duration-200 ${collapsed ? "w-24" : "w-80"}`}>
  <div className="flex items-center justify-between px-6 py-5">
    <img
    src={collapsed ? "assets/images/1-1.png" : "assets/images/1_1.png"}
    alt="Logo"
    className={collapsed ? "h-12 mx-auto transition-all duration-200" : "h-16 transition-all duration-200"}
  />
    <button
      className="-mt-4 mb-0 ml-6 flex flex-col justify-center"
      onClick={() => setCollapsed(!collapsed)}
      aria-label="Toggle sidebar"
    >
      <span className="w-8 h-2 rounded bg-black mb-1"></span>
      <span className="w-8 h-2 rounded bg-black mb-1"></span>
      <span className="w-8 h-2 rounded bg-black"></span>
    </button>
  </div>
  <nav className="flex flex-col mt-10 gap-3 flex-1">
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
  <button className={`flex items-center px-6 py-5 hover:bg-gray-100 transition rounded-2xl mb-3 text-xl ${collapsed ? "justify-center" : ""}`} style={{marginTop: "auto"}} onClick={() => navigate("/")}>
    <img src="assets/images/image_10.png" alt="Log Out" className="w-12 h-12" />
    {!collapsed && <span className="ml-5 font-semibold text-gray-900 text-2xl">Log Out</span>}
  </button>
</aside>

      {/* Main and Topbar */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${collapsed ? "ml-16" : "ml-60"}`}>
        <div className="h-16 w-full bg-white flex items-center justify-end px-12 shadow relative z-10">
          <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full mr-4" />
          <button
            className="font-bold text-lg text-gray-800 hover:underline cursor-pointer mr-16"
            onClick={() => setShowEditModal(true)}
          >
            {user.firstName} {user.lastName}
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 flex flex-col p-8">{children}</main>

        {/* Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-red-700/90 rounded-2xl shadow-xl p-7 w-full max-w-lg flex flex-col space-y-5 text-white relative">
              <button
                className="absolute top-3 right-4 text-2xl text-white"
                onClick={() => setShowEditModal(false)}
                aria-label="Close"
              >&times;</button>
              <h3 className="text-xl font-semibold mb-2">Edit Information</h3>
              <div className="flex items-center space-x-6">
                <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full bg-white" />
                <div>
                  <div className="font-bold text-lg">{user.firstName}</div>
                  <div className="font-bold text-xl">{user.lastName}</div>
                </div>
              </div>
              <form className="grid grid-cols-2 gap-4 mt-3" onSubmit={handleSave}>
                <input className="p-2 rounded bg-white text-black" defaultValue={user.firstName} placeholder="First Name" name="firstName" />
                <input className="p-2 rounded bg-white text-black" defaultValue={user.lastName} placeholder="Last Name" name="lastName" />
                <input className="p-2 rounded bg-white text-black" defaultValue={user.phone} placeholder="Phone Number" name="phone" />
                <input className="p-2 rounded bg-white text-black" defaultValue={user.birthday} placeholder="Birthday" name="birthday" />
                <div className="col-span-2 flex justify-center mt-3 space-x-5">
                  <button type="button" className="bg-white text-red-700 px-6 py-2 rounded font-bold" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="bg-red-300 text-white px-6 py-2 rounded font-bold">
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
      