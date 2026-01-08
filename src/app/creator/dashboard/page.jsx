export default function CreatorDashboard() {
  return (
    <div className="creator-dashboard">

      <div className="page-header">
        <h1>Creator Dashboard</h1>
        <p>Your assignments and earnings</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="icon-badge badge-blue">📋</div>
          <div className="meta">
            <span className="label">Active Tasks</span>
            <span className="value">8</span>
            <span className="sublabel">3 due this week</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="icon-badge badge-green">✔️</div>
          <div className="meta">
            <span className="label">Completed</span>
            <span className="value">42</span>
            <span className="sublabel sub-green">This month</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="icon-badge badge-purple">⭐</div>
          <div className="meta">
            <span className="label">Success Rate</span>
            <span className="value">96%</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="icon-badge badge-yellow">$</div>
          <div className="meta">
            <span className="label">Earnings</span>
            <span className="value">$3,240</span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="section-card">
        <div className="section-header">My Assignments</div>
        {/* Assignment list later */}
      </div>

      <div className="section-card">
        <div className="section-header">Performance</div>
        {/* Chart will go here */}
      </div>
    </div>
  );
}
