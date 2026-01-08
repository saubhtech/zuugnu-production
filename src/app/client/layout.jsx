"use client";
import "./client.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import DashboardTab from "./dashboard/tabs/DashboardTab";
import MyProjectsTab from "./dashboard/tabs/MyProjectsTab";
import BidsProposalsTab from "./dashboard/tabs/BidsProposalsTab";
import ContentApprovalsTab from "./dashboard/tabs/ContentApprovalsTab";
import EscrowPaymentsTab from "./dashboard/tabs/EscrowPaymentsTab";
import CampaignAnalyticsTab from "./dashboard/tabs/CampaignAnalyticsTab";
import ProfileTab from "./dashboard/tabs/ProfileTab";

export default function ClientLayout() {
  const params = useSearchParams();
  const tab = params.get("tab") || "dashboard";

  const renderTab = () => {
    switch (tab) {
      case "projects": return <MyProjectsTab />;
      case "bids": return <BidsProposalsTab />;
      case "approvals": return <ContentApprovalsTab />;
      case "escrow": return <EscrowPaymentsTab />;
      case "analytics": return <CampaignAnalyticsTab />;
      case "profile": return <ProfileTab />;
      default: return <DashboardTab />;
    }
  };

  const links = [
    { tab: "dashboard", label: "Dashboard" },
    { tab: "projects", label: "My Projects" },
    { tab: "bids", label: "Bids & Proposals" },
    { tab: "approvals", label: "Content Approvals" },
    { tab: "escrow", label: "Escrow & Payments" },
    { tab: "analytics", label: "Campaign Analytics" },
    { tab: "profile", label: "My Profile" },
  ];

  return (
    <div className="client-container">

      {/* TOP BAR */}
      <header className="client-topbar">
        <div>
          <div className="brand">UGC SMA Platform</div>
          <div className="sub">Client Portal</div>
        </div>
      </header>

      {/* FULL BODY */}
      <div className="client-body">

        {/* SIDEBAR LEFT */}
        <aside className="client-sidebar">
          {links.map(item => (
            <Link
              key={item.tab}
              href={`/client/dashboard?tab=${item.tab}`}
              className={tab === item.tab ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </aside>

        {/* MAIN CONTENT RIGHT */}
        <main className="client-main">
          {renderTab()}
        </main>

      </div>
    </div>
  );
}
