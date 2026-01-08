"use client";
import "./consultant.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConsultantLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) return router.push("/login");
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <>Loading...</>;

  return (
    <div className="consultant-root">

      {/* Global Top Portal Bar */}
      <nav className="portal-navbar">
        <div className="navbar-left">
          <div className="brand-name">UGC SMA Platform</div>
          <div className="portal-switch">
            <button>Admin</button>
            <button>Client</button>
            <button className="active">Consultant</button>
            <button>Creator</button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="bell">🔔</div>
          <div className="avatar-badge">{user.name?.charAt(0) || "C"}</div>
          <span className="user-role">{user.name}</span>
        </div>
      </nav>

      <div className="workspace">

        {/* Sidebar */}
        <aside className="consultant-sidebar">

          <div className="sidebar-header">
            <div className="sidebar-title">Consultant Portal</div>
            <div className="sidebar-subtitle">Manage Projects & Teams</div>
          </div>

          <a href="/consultant/dashboard" className="sidebar-link active">📊 Dashboard</a>
          <a href="/consultant/projects" className="sidebar-link">🛒 Project Marketplace</a>
          <a href="/consultant/bids" className="sidebar-link">📁 My Bids</a>
          <a href="/consultant/active-projects" className="sidebar-link">📂 Active Projects</a>
          <a href="/consultant/creators" className="sidebar-link">👥 Manage Creators</a>
          <a href="/consultant/earnings" className="sidebar-link">💰 Earnings & Escrow</a>
          <a href="/consultant/profile" className="sidebar-link">👤 Profile</a>

          <button 
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("authUser");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </aside>

        {/* Main */}
        <main className="consultant-content">
          {children}
        </main>

      </div>
    </div>
  );
}
