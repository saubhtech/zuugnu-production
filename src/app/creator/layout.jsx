"use client";
import "./creator.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatorLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) return router.push("/login");
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <>Loading...</>;

  return (
    <div className="creator-root">

      {/* Top Gradient Toolbar */}
      <nav className="creator-navbar">
        <div className="navbar-left">
          <div className="brand-name">UGC SMA Platform</div>
          <div className="portal-switch">
            <button>Admin</button>
            <button>Client</button>
            <button>Consultant</button>
            <button className="active">Creator</button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="notify-bell">🔔</div>
          <div className="user-badge">
            {user.name?.charAt(0) || "C"}
          </div>
          <span className="user-role">{user.name}</span>
        </div>
      </nav>

      <div className="workspace">
        
        {/* Sidebar */}
        <aside className="creator-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">Creator Portal</div>
            <div className="sidebar-subtitle">Create & Earn</div>
          </div>

          <a href="/creator/dashboard" className="sidebar-link active">🏠 Dashboard</a>
          <a href="/creator/tasks" className="sidebar-link">📝 Available Tasks</a>
          <a href="/creator/my-tasks" className="sidebar-link">✔ My Tasks</a>
          <a href="/creator/upload" className="sidebar-link">📤 Submit Content</a>
          <a href="/creator/earnings" className="sidebar-link">💰 Earnings</a>
          <a href="/creator/profile" className="sidebar-link">👤 Profile</a>

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

        {/* Dashboard / Page Content */}
        <main className="creator-content">
          {children}
        </main>
      </div>
    </div>
  );
}
