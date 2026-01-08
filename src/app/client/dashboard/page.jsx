export default function ClientDashboard() {
  return (
    <div className="client-dashboard">

      <div className="page-header">
        <h1>Client Dashboard</h1>
        <p>Manage your campaigns and track performance</p>
      </div>

      {/* STATS ROW */}
      <div className="stats-grid">
        <div className="stats-card">
          <span className="label">Active Projects</span>
          <span className="value">8</span>
          <span className="sub">3 awaiting bids</span>
        </div>

        <div className="stats-card">
          <span className="label">In Escrow</span>
          <span className="value">$32,500</span>
          <span className="sub">5 projects</span>
        </div>

        <div className="stats-card">
          <span className="label">Completed</span>
          <span className="value">42</span>
          <span className="sub green">98% success rate</span>
        </div>

        <div className="stats-card">
          <span className="label">Total Reach</span>
          <span className="value">2.4M</span>
          <span className="sub green">↑ 35%</span>
        </div>
      </div>

      {/* ACTIVE PROJECTS */}
      <div className="section-card">
        <div className="section-header">
          <span>Active Projects</span>
          <a className="view-all" href="#">View All</a>
        </div>

        <div className="campaign-card">
          <div className="campaign-title">Nike Summer Campaign</div>
          <div className="campaign-meta">
            <div>
              <div className="meta-label">Budget</div>
              <div className="meta-value">$5,000</div>
            </div>
            <div>
              <div className="meta-label">Progress</div>
              <div className="meta-value">65%</div>
            </div>
            <div>
              <div className="meta-label">Due</div>
              <div className="meta-value">12 days</div>
            </div>
          </div>

          <div className="progress-wrap">
            <div className="progress-bar" style={{ width: "65%" }}></div>
          </div>

          <div className="status">In Progress</div>
        </div>
      </div>

      {/* PERFORMANCE */}
      <div className="section-card">
        <div className="section-header">Campaign Performance</div>
        <div className="chart-placeholder">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}
