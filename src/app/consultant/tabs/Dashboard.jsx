"use client";

export default function DashboardTab() {
  return (
    <div>
      <h1 className="page-title">Consultant Dashboard</h1>
      <p className="page-sub">Manage campaigns, creators & approvals</p>

      {/* Stats */}
      <div className="stats-4">
        <div className="stat-card">
          <small>Active Campaigns</small>
          <h2>12</h2>
          <p className="text-mini text-green">+4 new this week</p>
        </div>
        <div className="stat-card">
          <small>Creators Assigned</small>
          <h2>38</h2>
          <p className="text-mini">Across 12 campaigns</p>
        </div>
        <div className="stat-card">
          <small>Pending Reviews</small>
          <h2 className="red">9</h2>
          <p className="text-mini red">Needs action</p>
        </div>
        <div className="stat-card">
          <small>Total Escrow</small>
          <h2 className="green">$18,200</h2>
          <p className="text-mini">Managed by you</p>
        </div>
      </div>

      {/* Panels */}
      <div className="dash-grid">
        <div className="panel">
          <div className="panel-head">
            <h3>Active Assignments</h3>
            <span className="view-link">View All</span>
          </div>

          <div className="assign-line">
            <b>Instagram Reel - Nike Air</b>
            <span className="badge pending">Pending</span>
          </div>

          <div className="assign-line">
            <b>Youtube Review - Adidas Boost</b>
            <span className="badge review">Reviewing</span>
          </div>
        </div>

        <div className="panel">
          <h3>Performance Trend</h3>
          <div className="chart-placeholder big" />
        </div>
      </div>
    </div>
  );
}
