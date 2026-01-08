"use client";
import { useRouter, useSearchParams } from "next/navigation";
import "./consultant.css";

export default function ConsultantLayout({ children }) {
  const router = useRouter();
  const tab = useSearchParams().get("tab") || "dashboard";

  const go = t => router.push(`/consultant?tab=${t}`);

  return (
    <>
      {/* HEADER */}
      <div className="consult-header">
        <span>Consultant Workspace</span>

        <div className="ch-right">
          <span className="avatar-pill">SC</span>
          <span>Sarah Chen</span>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="consult-layout">

        {/* SIDEBAR */}
        <aside className="consult-sidebar">
          <div className="sidebar-title">UGC SMA Platform</div>
          <div className="sidebar-sub">Consultant Portal</div>

          <div className="nav-menu">
            <div className={`nav-item ${tab==="dashboard"?"active":""}`} onClick={()=>go("dashboard")}>Dashboard</div>
            <div className={`nav-item ${tab==="marketplace"?"active":""}`} onClick={()=>go("marketplace")}>Marketplace</div>
            <div className={`nav-item ${tab==="active"?"active":""}`} onClick={()=>go("active")}>Active Assignments</div>
            <div className={`nav-item ${tab==="review"?"active":""}`} onClick={()=>go("review")}>Review & Approvals</div>
            <div className={`nav-item ${tab==="creators"?"active":""}`} onClick={()=>go("creators")}>Creators</div>
            <div className={`nav-item ${tab==="analytics"?"active":""}`} onClick={()=>go("analytics")}>Analytics</div>
            <div className={`nav-item ${tab==="earnings"?"active":""}`} onClick={()=>go("earnings")}>Escrow & Earnings</div>
            <div className={`nav-item ${tab==="projects"?"active":""}`} onClick={()=>go("projects")}>Projects</div>
            <div className={`nav-item ${tab==="bids"?"active":""}`} onClick={()=>go("bids")}>My Bids</div>
            <div className={`nav-item ${tab==="profile"?"active":""}`} onClick={()=>go("profile")}>Profile</div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="consult-content">
          {children}
        </main>

      </div>
    </>
  );
}
