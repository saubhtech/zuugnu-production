"use client";

export default function Analytics() {
  return (
    <div className="tab-wrap">
      <h1 className="tab-title">Analytics & Insights</h1>
      <p className="tab-sub">Campaign performance, creator metrics and business insights</p>

      <div className="stat-grid mt20">
        <div className="stat-card">
          <small>Total Projects</small>
          <h2>28</h2>
        </div>

        <div className="stat-card">
          <small>Creators Managed</small>
          <h2>112</h2>
        </div>

        <div className="stat-card">
          <small>Approval Rate</small>
          <h2>94%</h2>
        </div>

        <div className="stat-card">
          <small>Avg. Completion Time</small>
          <h2>4.2 Days</h2>
        </div>
      </div>

      <div className="panel big mt20">
        <h3>Project Performance Trend</h3>
        <div className="chart-placeholder big" />
      </div>

      <div className="panel big">
        <h3>Creator Productivity</h3>
        <div className="chart-placeholder big" />
      </div>
    </div>
  );
}
