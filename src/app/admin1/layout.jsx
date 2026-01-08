"use client";
import "./admin1.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) return router.push("/login");
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <>Loading...</>;

  return (
    <div className="admin-root">

      {/* Global Gradient Navbar */}
      <nav className="portal-navbar">
        <div className="navbar-left">
          <div className="brand-name">UGC SMA Platform</div>
          <div className="portal-switch">
            <button className="active">Admin</button>
            <button>Client</button>
            <button>Consultant</button>
            <button>Creator</button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="notify-bell">🔔</div>
          <div className="avatar">{user.name?.charAt(0) || "A"}</div>
          <span className="user-role">{user.name}</span>
        </div>
      </nav>

      <div className="workspace">

        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">Admin Panel</div>
            <div className="sidebar-subtitle">System Management</div>
          </div>

          <a href="/admin/dashboard" className="sidebar-link active">📊 Dashboard</a>
          <a href="/admin/clients" className="sidebar-link">👥 Clients (60)</a>
          <a href="/admin/consultants" className="sidebar-link">💼 Consultants</a>
          <a href="/admin/creators" className="sidebar-link">🎨 Creators (150)</a>
          <a href="/admin/projects" className="sidebar-link">📁 All Projects</a>
          <a href="/admin/escrow" className="sidebar-link">🛡 Escrow Accounts</a>
          <a href="/admin/analytics" className="sidebar-link">📈 Analytics</a>

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

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
