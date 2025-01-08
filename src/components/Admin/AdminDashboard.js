import React, { useState } from "react";
import CompanyManagement from "./CompanyManagement";
import CommunicationMethodManagement from "./CommunicationMethodManagement";
import Navbar from '../Navbar/Navbar'; // Import Navbar component
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("companies");

  return (
    <div className="admin-dashboard">
      <Navbar showExtras={false} />
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("companies")}>Company Management</button>
        <button onClick={() => setActiveTab("methods")}>Communication Methods</button>
      </div>
      <div className="tab-content">
        {activeTab === "companies" && <CompanyManagement />}
        {activeTab === "methods" && <CommunicationMethodManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;