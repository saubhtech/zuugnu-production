"use client";

import { useState } from "react";

export default function SubmitTab() {
  const [activeTab, setActiveTab] = useState("review");

  const tabs = [
    { id: "review", label: "In Review", count: 3 },
    { id: "revision", label: "Revision Requested", count: 1 },
    { id: "approved", label: "Approved", count: 25 },
    { id: "rejected", label: "Rejected", count: 2 },
    { id: "drafts", label: "Drafts", count: 5 },
  ];

  return (
    <div className="creator-submit-wrap">

      {/* HEADER */}
      <div className="submit-header-row">
        <h1 className="page-title">Submit Content</h1>
        <button className="primary-btn">+ New Submission</button>
      </div>

      {/* TABS */}
      <div className="submit-tabs">
        {tabs.map(t => (
          <div
            key={t.id}
            className={`submit-tab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label} ({t.count})
          </div>
        ))}
      </div>

      {/* SUBMISSION CARD */}
      <div className="submit-card">
        <div className="submit-title">
          <b>YouTube Video - Adidas Ultraboost</b>
        </div>

        <div className="submit-sub">
          Project: Adidas Brand Awareness • Platform: YouTube
        </div>

        <div className="submit-detail-grid">
          <div>
            <small>Assigned Consultant</small>
            <p>John Smith</p>
          </div>
          <div>
            <small>Submitted On</small>
            <p>Jan 7, 2026</p>
          </div>
          <div>
            <small>Payment</small>
            <p className="green">$250</p>
          </div>
        </div>

        <div className="submit-status-row">
          <span className="status-tag">In Review (Consultant)</span>

          <div className="submit-actions">
            <button className="text-red-btn">Cancel Submission</button>
            <button className="view-btn">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
