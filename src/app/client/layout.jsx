"use client";
import "./client.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) return router.push("/login");
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <>Loading...</>;

  return (
    <div className="client-root">

      {/* GLOBAL PORTAL NAVBAR (Gradient) */}
      <nav className="portal-navbar">
        <div className="navbar-left">
          <div className="brand-name">UGC SMA Platform</div>
          <div className="portal-switch">
            <button>Admin</button>
            <button className="active">Client</button>
            <button>Consultant</button>
            <button>Creator</button>
          </div>
        </div>

        <div className="navbar-right">
          <button className="post-btn">+ Post New Project</button>
          <span className="notify">🔔</span>
          <div className="avatar">{user.name?.charAt(0) || "C"}</div>
          <span className="user-role">{user.name}</span>
        </div>
      </nav>

      <div className="workspace">

        {/* SIDEBAR */}
        <aside className="client-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">Client Portal</div>
            <div className="sidebar-subtitle">Post & Manage Projects</div>
          </div>

          <a href="/client/dashboard" className="sidebar-link active">🏠 Dashboard</a>
          <a href="/client/projects" className="sidebar-link">📁 My Projects</a>
          <a href="/client/bids" className="sidebar-link">📑 Bids & Proposals</a>
          <a href="/client/content" className="sidebar-link">✔ Content Approvals</a>
          <a href="/client/payments" className="sidebar-link">💳 Escrow & Payments</a>
          <a href="/client/analytics" className="sidebar-link">📊 Campaign Analytics</a>
          <a href="/client/profile" className="sidebar-link">👤 Profile</a>

          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.removeItem("authUser");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="client-content">
          {children}
        </main>
      </div>
    </div>
  );
}
