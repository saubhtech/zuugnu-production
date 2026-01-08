"use client";

export default function AnalyticsTab() {
  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      <p className="page-sub">Insights across performance, engagement & payouts</p>

      <div className="stats-4">
        <div className="stat-card">
          <small>Approval Rate</small>
          <h2>91%</h2>
        </div>
        <div className="stat-card">
          <small>Completion Rate</small>
          <h2>97%</h2>
        </div>
        <div className="stat-card">
          <small>Avg. Earnings Per Creator</small>
          <h2>$1,870</h2>
        </div>
        <div className="stat-card">
          <small>Avg. Campaign Value</small>
          <h2>$8,400</h2>
        </div>
      </div>

      <div className="panel big">
        <h3>Campaign Spend Breakdown</h3>
        <div className="chart-placeholder big" />
      </div>

      <div className="panel big">
        <h3>Creator Performance Distribution</h3>
        <div className="chart-placeholder big" />
      </div>
    </div>
  );
}
