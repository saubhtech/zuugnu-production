// Dashboard.jsx
"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

   const [user, setUser] = useState(null);

  // ✅ FIX: fetch user name from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  // ================= STYLE DEFINITIONS =================
  const dashboardContainerStyle = {
    flex: 1,
    overflowY: "auto",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f5f7fa",
  };
  
  const statsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  };

  const mainGrid = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  };

  const cardHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const filterTabs = {
    display: "flex",
    gap: "10px",
    background: "#f1f5f9",
    padding: "4px",
    borderRadius: "8px",
  };

  const tab = {
    padding: "6px 16px",
    borderRadius: "6px",
    border: "none",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  };

  const activeTab = {
    ...tab,
    background: "white",
    color: "#0f172a",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const table = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
  };

  const tableHeader = {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    borderBottom: "1px solid #e2e8f0",
  };

  const tableRow = {
    borderBottom: "1px solid #e2e8f0",
  };

  const tableCell = {
    padding: "16px",
    fontSize: "14px",
  };

  const statusBadge = {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Hot":
        return { background: "#fee2e2", color: "#dc2626" };
      case "Warm":
        return { background: "#fef3c7", color: "#d97706" };
      case "Cold":
        return { background: "#dbeafe", color: "#2563eb" };
      default:
        return { background: "#f1f5f9", color: "#64748b" };
    }
  };

  const messageBtn = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    color: "#374151",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  };

  const actionsCol = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "16px",
  };

  const actionBtn = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "white",
    color: "#0f172a",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
  };

  const primaryActionBtn = {
    ...actionBtn,
    background: "#4f46e5",
    color: "white",
    border: "none",
  };

  return (
    <div style={dashboardContainerStyle}>
      {/* ================= HEADER ================= */}
     <div className="header">
        <div className="welcome-section">
          <h2>Welcome, {user?.name || "User"}</h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
            Manage your WhatsApp CRM from here
          </p>
        </div>

        <div className="header-right">
          <div className="search-bar">
            <i className="fas fa-search" style={{ color: "#94a3b8" }}></i>
            <input
              type="text"
              placeholder="Search leads, campaigns, messages..."
            />
            <div className="search-icon">
              <i className="fas fa-search" style={{ color: "#475569" }}></i>
            </div>
          </div>

          <div className="user-profile">
            <div className="user-avatar">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "U"}
            </div>
            <div className="user-dropdown">
              <span>{user?.name || "User"}</span>
              <i
                className="fas fa-chevron-down"
                style={{ marginLeft: "8px", fontSize: "12px" }}
              ></i>
            </div>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      {/* ================= DASHBOARD TITLE ================= */}
      <div className="dashboard-title">
        <h1>Dashboard Overview</h1>
      </div>

      {/* ================= STATS GRID ================= */}
      <div style={statsGrid}>
        <StatCard
          title="Total Leads"
          value="2,847"
          trend="+12.5%"
          trendText="from last month"
          color="#4f46e5"
        />
        <StatCard
          title="Active Campaigns"
          value="342"
          trend="+8.3%"
          trendText="from last month"
          color="#10b981"
        />
        <StatCard
          title="Messages Sent"
          value="18.4K"
          trend="+24.8%"
          trendText="from last month"
          color="#f59e0b"
        />
        <StatCard
          title="Response Rate"
          value="67.2%"
          trend="+3.2%"
          trendText="from last month"
          color="#ef4444"
        />
      </div>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div style={mainGrid}>
        {/* ===== LEFT COLUMN: RECENT LEADS ===== */}
        <div className="card">
          <div style={cardHeader}>
            <h3>Recent Leads</h3>
            <div style={filterTabs}>
              <button style={activeTab}>New</button>
              <button style={tab}>All</button>
            </div>
          </div>

          <table style={table}>
            <thead>
              <tr>
                <th style={tableHeader}>NAME</th>
                <th style={tableHeader}>PHONE</th>
                <th style={tableHeader}>STATUS</th>
                <th style={tableHeader}>SOURCE</th>
                <th style={tableHeader}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <LeadRow
                name="Sarah Johnson"
                phone="+1 234-567-8901"
                status="Hot"
                source="Website"
              />
              <LeadRow
                name="Mike Thompson"
                phone="+1 234-567-8902"
                status="Warm"
                source="Facebook"
              />
              <LeadRow
                name="Emily Davis"
                phone="+1 234-567-8903"
                status="Cold"
                source="Instagram"
              />
              <LeadRow
                name="David Wilson"
                phone="+1 234-567-8904"
                status="Hot"
                source="Referral"
              />
            </tbody>
          </table>
        </div>

        {/* ===== RIGHT COLUMN: QUICK ACTIONS ===== */}
        <div className="card">
          <h3>Quick Actions</h3>
          <div style={actionsCol}>
            <ActionBtn icon="+" label="Add New Lead" primary />
            <ActionBtn icon="📣" label="Create Campaign" />
            <ActionBtn icon="📥" label="Import Contacts" />
            <ActionBtn icon="💬" label="Broadcast Message" />
            <ActionBtn icon="📤" label="Export Data" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, trend, trendText, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <h2 style={{ margin: "0 0 5px 0", fontSize: "32px", fontWeight: "600" }}>
        {value}
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            color: trend.startsWith("-") ? "#ef4444" : "#10b981",
            fontWeight: "600",
          }}
        >
          {trend}
        </span>
        <span style={{ color: "#64748b", fontSize: "14px" }}>{trendText}</span>
      </div>
      <p style={{ color: "#475569", margin: "8px 0 0 0", fontSize: "14px" }}>
        {title}
      </p>
    </div>
  );
}

function LeadRow({ name, phone, status, source }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Hot":
        return { background: "#fee2e2", color: "#dc2626" };
      case "Warm":
        return { background: "#fef3c7", color: "#d97706" };
      case "Cold":
        return { background: "#dbeafe", color: "#2563eb" };
      default:
        return { background: "#f1f5f9", color: "#64748b" };
    }
  };

  const statusBadge = {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  };

  const tableCell = {
    padding: "16px",
    fontSize: "14px",
  };

  const messageBtn = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    color: "#374151",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
      <td style={tableCell}>
        <strong>{name}</strong>
      </td>
      <td style={tableCell}>{phone}</td>
      <td style={tableCell}>
        <span style={{ ...statusBadge, ...getStatusStyle(status) }}>
          {status}
        </span>
      </td>
      <td style={tableCell}>{source}</td>
      <td style={tableCell}>
        <button style={messageBtn}>Message</button>
      </td>
    </tr>
  );
}

function ActionBtn({ icon, label, primary }) {
  const actionBtn = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "white",
    color: "#0f172a",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
  };

  const primaryActionBtn = {
    ...actionBtn,
    background: "#4f46e5",
    color: "white",
    border: "none",
  };

  return (
    <button style={primary ? primaryActionBtn : actionBtn}>
      <span style={{ marginRight: "8px" }}>{icon}</span>
      {label}
    </button>
  );
}

// CSS Styles - Add these to your global CSS file
const globalStyles = `
.dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.welcome-section h2 {
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  width: 300px;
  border: 1px solid #e2e8f0;
  position: relative;
}

.search-bar i.fa-search:first-child {
  color: #94a3b8;
  margin-right: 10px;
  font-size: 14px;
}

.search-bar input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #64748b;
  background: transparent;
}

.search-icon {
  position: absolute;
  right: 12px;
  color: #475569;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
}

.logout-btn {
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: #16a34a;
}

.dashboard-title h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #0f172a;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
}

.card h3 {
  margin: 0 0 20px 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 600;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
}
`;
