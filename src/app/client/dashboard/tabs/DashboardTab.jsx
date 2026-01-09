"use client";

export default function DashboardTab() {
  return (
    <div className="client-dashboard-wrap">

      {/* TOP ACTION BUTTON */}
      <div className="top-actions">
        <button className="btn-post">+ Post New Project</button>
      </div>

      {/* KPI SECTION */}
      <div className="stats-row">

        <div className="stat-tile">
          <span className="tile-label">Active Projects</span>
          <h2>8</h2>
          <small className="tile-sub">3 awaiting bids</small>
        </div>

        <div className="stat-tile">
          <span className="tile-label">In Escrow</span>
          <h2 className="green">$32,500</h2>
          <small className="tile-sub">5 projects</small>
        </div>

        <div className="stat-tile">
          <span className="tile-label">Completed</span>
          <h2>42</h2>
          <small className="tile-sub green">98% success rate</small>
        </div>

        <div className="stat-tile">
          <span className="tile-label">Total Reach</span>
          <h2>2.4M</h2>
          <small className="tile-sub green">↑ 35%</small>
        </div>

      </div>

      {/* PANELS */}
      <div className="dash-panels">

        {/* ACTIVE PROJECTS PANEL */}
        <div className="panel">
          <div className="panel-header">
            <h3>Active Projects</h3>
            <span className="view-link">View All</span>
          </div>

          <div className="project-mini-card blue">
            <div className="proj-title">Nike Summer Campaign</div>
            <div className="proj-right">In Progress</div>

            <div className="proj-meta">
              <div><small>Budget</small><span>$5,000</span></div>
              <div><small>Progress</small><span>65%</span></div>
              <div><small>Due</small><span>12 days</span></div>
            </div>
          </div>

          <div className="project-mini-card yellow">
            <div className="proj-title">Adidas Brand Awareness</div>
            <div className="proj-right pending">Pending Bids</div>

            <div className="proj-meta">
              <div><small>Budget</small><span>$8,500</span></div>
              <div><small>Bids</small><span>3 proposals</span></div>
              <div><small>Post Date</small><span>Jan 1, 2026</span></div>
            </div>
          </div>
        </div>

        {/* CHART PANEL */}
        <div className="panel">
          <h3>Campaign Performance</h3>
          <div className="placeholder-chart">
            <span>Chart Coming Soon</span>
          </div>
        </div>

      </div>

    </div>
  );
}
