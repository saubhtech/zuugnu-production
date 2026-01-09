"use client";

import { useSearchParams } from "next/navigation";

// Tabs
import Dashboard from "./tabs/Dashboard";
import Marketplace from "./tabs/Marketplace";
import MyBids from "./tabs/MyBids";
import Projects from "./tabs/Projects";                 // Active Projects
import ContentApprovals from "./tabs/ContentApprovals"; // Consultant Approvals
import Creators from "./tabs/Creators";
import Analytics from "./tabs/Analytics";
import Earnings from "./tabs/Earnings";
import Profile from "./tabs/Profile";
import DistributeAssignments from "./tabs/DistributeAssignments";

// Optional future screens
// import DistributeAssignments from "./tabs/DistributeAssignments";
// import ReviewApprovals from "./tabs/ReviewApprovals"; // Brand-level review

export default function ConsultantPage() {
  const tab = useSearchParams().get("tab") || "dashboard";

  return (
    <>
      {tab === "dashboard" && <Dashboard />}
      {tab === "marketplace" && <Marketplace />}
      {tab === "bids" && <MyBids />}
      {tab === "projects" && <Projects />}
      {tab === "approvals" && <ContentApprovals />}   {/* FIXED */}
      {tab === "creators" && <Creators />}
      {tab === "assignments" && <DistributeAssignments />}
        {tab === "earnings" && <Earnings />}
      {tab === "analytics" && <Analytics />}
      {tab === "profile" && <Profile />}

      {/* Optional future flows */}
      {/* {tab === "review" && <ReviewApprovals />} */}
      {/* {tab === "assignments" && <DistributeAssignments />} */}
    </>
  );
}
