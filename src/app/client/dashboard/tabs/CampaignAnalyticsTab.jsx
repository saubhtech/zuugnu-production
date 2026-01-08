"use client";

export default function CampaignAnalyticsTab() {
  return (
    <div>
      <h1 className="page-title">Campaign Analytics</h1>
      <p className="page-sub">Track the performance and ROI of your campaigns</p>

      <div className="analytics-row">
        <div className="stat-box"><small>Total Reach</small><h2>2.4M</h2><p className="green">↑ 35%</p></div>
        <div className="stat-box"><small>Total Engagement</small><h2>180K</h2><p className="green">↑ 28%</p></div>
        <div className="stat-box"><small>Engagement Rate</small><h2>7.5%</h2><p className="green">High performance</p></div>
        <div className="stat-box"><small>Campaign ROI</small><h2 className="green">+120%</h2><p className="muted">Estimated</p></div>
      </div>

      <div className="panel big">
        <h3>Reach & Engagement Trend</h3>
        <div className="placeholder-big">Chart Placeholder</div>
      </div>

      <div className="panel big">
        <h3>Content Type Performance</h3>
        <div className="placeholder-big">Chart Placeholder</div>
      </div>
    </div>
  );
}
