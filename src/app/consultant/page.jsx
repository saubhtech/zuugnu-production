"use client";

import { useSearchParams } from "next/navigation";

import Dashboard from "./tabs/Dashboard";
import Marketplace from "./tabs/Marketplace";
import Assignments from "./tabs/ActiveAssignments";
import Approvals from "./tabs/Approvals";
import Creators from "./tabs/Creators";
import Analytics from "./tabs/Analytics";
import Earnings from "./tabs/Earnings";
import Profile from "./tabs/Profile";
import Projects from "./tabs/Projects";
import MyBids from "./tabs/MyBids";
// import Messaging from "./tabs/Messaging"; // optional
// import Notifications from "./tabs/Notifications"; // optional

export default function ConsultantPage() {
  const tab = useSearchParams().get("tab") || "dashboard";

  return (
    <>
      {tab === "dashboard" && <Dashboard />}
      {tab === "marketplace" && <Marketplace />}
      {tab === "assignments" && <Assignments />}
      {tab === "approvals" && <Approvals />}
      {tab === "creators" && <Creators />}
      {tab === "analytics" && <Analytics />}
      {tab === "earnings" && <Earnings />}
      {tab === "projects" && <Projects />}
      {tab === "bids" && <MyBids />}
      {tab === "profile" && <Profile />}

      {/* Optional */}
      {/* {tab === "messaging" && <Messaging />} */}
      {/* {tab === "notifications" && <Notifications />} */}
    </>
  );
}
