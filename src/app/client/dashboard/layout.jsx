"use client";

import "./client.css";
import { useState } from "react";

import OverviewTab from "./tabs/OverviewTab.jsx";
import AllContentTab from "./tabs/AllContentTab.jsx";
import AnalyticsTab from "./tabs/AnalyticsTab.jsx";
import PlatformsTab from "./tabs/PlatformsTab.jsx";
import CalendarTab from "./tabs/CalendarTab.jsx";
import ReviewsTab from "./tabs/ReviewsTab.jsx";

const tabs = [
  "Overview",
  "All Content",
  "Analytics",
  "Platforms",
  "Calendar",
  "Reviews",
];

export default function ClientLayout({ children }) {
  const [active, setActive] = useState("Overview");

  return (
    <div className="client-layout">

      {/* NAVBAR */}
      <nav className="client-navbar">
        <div className="navbar-brand">
          <div className="brand-icon">💼</div>
          <div>
            <h1>TechCorp Solutions</h1>
            <p>San Francisco, CA</p>
          </div>
        </div>

        <div className="navbar-right">
          <select className="date-select">
            <option>Last 30 days</option>
          </select>
          <button className="request-btn">+ Request Content</button>
        </div>
      </nav>

      {/* TAB BAR */}
      <div className="tab-bar">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab-btn ${active === t ? "active" : ""}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT (renders correct tab) */}
      <main className="client-main">
        {active === "Overview" && <OverviewTab />}
        {active === "All Content" && <AllContentTab />}
        {active === "Analytics" && <AnalyticsTab />}
        {active === "Platforms" && <PlatformsTab />}
        {active === "Calendar" && <CalendarTab />}
        {active === "Reviews" && <ReviewsTab />}
      </main>
    </div>
  );
}
