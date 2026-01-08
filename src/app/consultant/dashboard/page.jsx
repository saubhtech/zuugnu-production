export default function ConsultantDashboard() {
  return (
    <div className="consultant-dashboard">

      <div className="page-header">
        <h1>Consultant Dashboard</h1>
        <p>Manage projects and creator teams</p>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <div className="stats-card">
          <span className="label">Active Projects</span>
          <span className="value">5</span>
        </div>

        <div className="stats-card">
          <span className="label">In Escrow</span>
          <span className="value green">$18,500</span>
        </div>

        <div className="stats-card">
          <span className="label">Pending Bids</span>
          <span className="value">3</span>
        </div>

        <div className="stats-card">
          <span className="label">My Creators</span>
          <span className="value">28</span>
        </div>

        <div className="stats-card">
          <span className="label">This Month</span>
          <span className="value">$12.4K</span>
        </div>
      </div>

      {/* Active Projects */}
      <div className="section-card">
        <div className="section-header">Active Projects</div>

        <div className="project-card">
          <div className="project-left">
            <div className="project-title">Nike Summer Campaign</div>

            <div className="project-attributes">
              <div className="attr">
                <span className="attr-label">Budget</span>
                <span className="attr-value">$5,000</span>
              </div>

              <div className="attr">
                <span className="attr-label">Creators</span>
                <span className="attr-value">12 assigned</span>
              </div>

              <div className="attr">
                <span className="attr-label">Progress</span>
                <span className="attr-value">65%</span>
              </div>

              <div className="attr">
                <span className="attr-label">Due</span>
                <span className="attr-value">12 days</span>
              </div>
            </div>

            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: "65%" }}></div>
            </div>
          </div>

          <div className="project-status">In Progress</div>
        </div>
      </div>

      {/* Earnings */}
      <div className="section-card">
        <div className="section-header">Earnings</div>
        <div className="chart-placeholder">
          Earnings Chart Placeholder
        </div>
      </div>

    </div>
  );
}
