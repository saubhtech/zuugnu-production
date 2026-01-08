"use client";
import { useRouter, useSearchParams } from "next/navigation";
import "./creator.css";

export default function CreatorLayout({ children }) {
  const router = useRouter();
  const tab = useSearchParams().get("tab") || "dashboard";

  const go = t => router.push(`/creator?tab=${t}`);

  return (
    <div className="creator-shell">
      {/* TOP HEADER BAR */}
      <header className="creator-header">
        <div className="creator-header-left">
          <img src="/rocket.svg" className="logo-icon" />
          <div>
            <div className="brand">UGC SMA Platform</div>
            <small className="brand-sub">Creator Portal</small>
          </div>
        </div>

        <div className="creator-header-right">
          <i className="bell">🔔</i>
          <div className="user-badge">SC</div>
          <span className="user-name">Sarah Chen</span>
        </div>
      </header>

      {/* PAGE BODY */}
      <div className="creator-layout">
        <aside className="sidebar">
          <h2>Creator Portal</h2>
          <p className="subtext">Create & Earn</p>

          <div className="nav-menu">
            <div className={`nav-item ${tab==="dashboard"?"active":""}`} onClick={()=>go("dashboard")}>Dashboard</div>
            <div className={`nav-item ${tab==="assign"?"active":""}`} onClick={()=>go("assign")}>My Assignments</div>
            <div className={`nav-item ${tab==="submit"?"active":""}`} onClick={()=>go("submit")}>Submit Content</div>
            <div className={`nav-item ${tab==="earnings"?"active":""}`} onClick={()=>go("earnings")}>Earnings</div>
            <div className={`nav-item ${tab==="performance"?"active":""}`} onClick={()=>go("performance")}>Performance</div>
            <div className={`nav-item ${tab==="profile"?"active":""}`} onClick={()=>go("profile")}>My Profile</div>
          </div>
        </aside>

        <main className="content-wrap">
          {children}
        </main>
      </div>
    </div>
  );
}
