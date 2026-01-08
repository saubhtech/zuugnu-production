"use client";
import { useSearchParams } from "next/navigation";

import DashboardTab from "./tabs/DashboardTab";
import MyProjectsTab from "./tabs/MyProjectsTab";
import BidsProposalsTab from "./tabs/BidsProposalsTab";
import ContentApprovalsTab from "./tabs/ContentApprovalsTab";
import EscrowPaymentsTab from "./tabs/EscrowPaymentsTab";
import CampaignAnalyticsTab from "./tabs/CampaignAnalyticsTab";
import ProfileTab from "./tabs/ProfileTab";

export default function ClientDashboardPage() {
  const params = useSearchParams();
  const tab = params.get("tab") || "dashboard";

  const renderTab = {
    dashboard: <DashboardTab />,
    projects: <MyProjectsTab />,
    bids: <BidsProposalsTab />,
    approvals: <ContentApprovalsTab />,
    escrow: <EscrowPaymentsTab />,
    analytics: <CampaignAnalyticsTab />,
    profile: <ProfileTab />,
  };

  return renderTab[tab] || <DashboardTab />;
}
