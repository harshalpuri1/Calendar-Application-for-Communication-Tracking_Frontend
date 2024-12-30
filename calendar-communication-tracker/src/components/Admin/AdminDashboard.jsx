// src/components/Admin/AdminDashboard.jsx
import React, { useState } from "react";
import CompanyManagement from "./CompanyManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("companies");

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("companies")}>Company Management</button>
        <button onClick={() => setActiveTab("methods")}>Communication Methods</button>
      </div>
      <div className="tab-content">
        {activeTab === "companies" && <CompanyManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;