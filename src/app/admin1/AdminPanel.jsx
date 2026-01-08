"use client";

import "./admin.css";
import { useState } from "react";

import DashboardTab from "./tabs/DashboardTab";
import ClientsTab from "./tabs/ClientsTab";
import ConsultantsTab from "./tabs/ConsultantsTab";
import CreatorsTab from "./tabs/CreatorsTab";
import ProjectsTab from "./tabs/ProjectsTab";
import EscrowTab from "./tabs/EscrowTab";
import QueueTab from "./tabs/QueueTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import SettingsTab from "./tabs/SettingsTab";

export default function AdminPanel() {

  const [active, setActive] = useState("Dashboard");

  const renderTab = () => {
    switch (active) {
      case "Dashboard": return <DashboardTab />;
      case "Clients": return <ClientsTab />;
      case "Consultants": return <ConsultantsTab />;
      case "Creators": return <CreatorsTab />;
      case "All Projects": return <ProjectsTab />;
      case "Escrow": return <EscrowTab />;
      case "Approval Queue": return <QueueTab />;
      case "Analytics": return <AnalyticsTab />;
      case "Settings": return <SettingsTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="admin-wrapper">

      {/* TOPBAR */}
      <div className="admin-topbar">
        <div className="brand">
          <div className="rocket">🚀</div>
          <div>
            <div className="brand-name">UGC SMA Platform</div>
            <div className="brand-sub">Admin Portal</div>
          </div>
        </div>

        <div className="admin-user-box">
          <button className="notif-btn">🔔</button>
          <div className="admin-avatar">AD</div>
          <span className="admin-name">Admin User</span>
        </div>
      </div>

      {/* BODY */}
      <div className="admin-body">

        {/* SIDEBAR */}
        <div className="admin-sidebar">
          <div className={`side-btn ${active==="Dashboard"?"active":""}`} onClick={()=>setActive("Dashboard")}>Dashboard</div>
          <div className={`side-btn ${active==="Clients"?"active":""}`} onClick={()=>setActive("Clients")}>Clients (60)</div>
          <div className={`side-btn ${active==="Consultants"?"active":""}`} onClick={()=>setActive("Consultants")}>Consultants (24)</div>
          <div className={`side-btn ${active==="Creators"?"active":""}`} onClick={()=>setActive("Creators")}>Creators (150)</div>
          <div className={`side-btn ${active==="All Projects"?"active":""}`} onClick={()=>setActive("All Projects")}>All Projects</div>
          <div className={`side-btn ${active==="Escrow"?"active":""}`} onClick={()=>setActive("Escrow")}>Escrow Account</div>
          <div className={`side-btn ${active==="Approval Queue"?"active":""}`} onClick={()=>setActive("Approval Queue")}>Approval Queue</div>
          <div className={`side-btn ${active==="Analytics"?"active":""}`} onClick={()=>setActive("Analytics")}>Analytics</div>
          <div className={`side-btn ${active==="Settings"?"active":""}`} onClick={()=>setActive("Settings")}>Settings</div>
        </div>

        {/* MAIN CONTENT */}
        <div className="admin-content">
          {renderTab()}
        </div>

      </div>
    </div>
  );
}
