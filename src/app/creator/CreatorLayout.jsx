"use client";
import { useRouter, useSearchParams } from "next/navigation";
import "./creator.css";

export default function CreatorLayout({ children }) {
  const router = useRouter();
  const tab = useSearchParams().get("tab") || "dashboard";

  const go = (t) => router.push(`/creator?tab=${t}`);

  const menu = [
    { key: "dashboard", label: "Dashboard", icon: "🏠" },
    { key: "assign", label: "My Assignments", icon: "📋" },
    { key: "submit", label: "Submit Content", icon: "📤" },
    { key: "earnings", label: "Earnings", icon: "💰" },
    { key: "performance", label: "Performance", icon: "📈" },
    { key: "profile", label: "My Profile", icon: "👤" },
  ];

  return (
    <div className="creator-shell">

      {/* HEADER */}
      <header className="creator-header">
        <div className="creator-header-left">
          <div>
            <div className="brand-top">UGC SMA Platform</div>
            <small className="brand-sub">Creator Portal</small>
          </div>
        </div>

        <div className="creator-header-right">
          <span className="notif-bell">🔔</span>
          <div className="user-avatar">SC</div>
          <span className="user-name">Sarah Chen</span>
        </div>
      </header>

      {/* MAIN BODY */}
      <div className="creator-layout">

        {/* SIDEBAR */}
        <aside className="creator-sidebar">
          <h3 className="sidebar-title">Creator Portal</h3>
          <p className="sidebar-sub">Create & Earn</p>

          <nav className="sidebar-nav">
            {menu.map(item => (
              <div
                key={item.key}
                className={`sidebar-item ${tab === item.key ? "active" : ""}`}
                onClick={() => go(item.key)}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="sidebar-content">
          {children}
        </main>
      </div>
    </div>
  );
}
