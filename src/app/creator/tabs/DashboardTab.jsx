"use client";

export default function DashboardTab() {
  return (
    <div className="creator-tab">

      {/* MAIN STATS */}
      <div className="stats-4">

        <div className="stat-card">
          <div className="icon-pill pink">
            📋
          </div>
          <small>Active Assignments</small>
          <h2>8</h2>
          <p className="text-muted">3 due this week</p>
        </div>

        <div className="stat-card">
          <div className="icon-pill green">
            ✅
          </div>
          <small>Completed This Month</small>
          <h2>42</h2>
          <p className="text-green text-mini">↑ +15% from last month</p>
        </div>

        <div className="stat-card">
          <div className="icon-pill purple">
            ⭐
          </div>
          <small>Approval Rate</small>
          <h2>96%</h2>
          <p className="text-muted">Overall success</p>
        </div>

        <div className="stat-card">
          <div className="icon-pill yellow">
            💰
          </div>
          <small>Total Earnings</small>
          <h2>$3,240</h2>
          <p className="text-muted">Lifetime earnings</p>
        </div>

      </div>

      {/* GRID BELOW */}
      <div className="dash-grid">

        {/* ---- LEFT PANEL ---- */}
        <div className="panel">
          <div className="panel-head">
            <h3>My Assignments</h3>
            <span className="view-link">View All</span>
          </div>

          <div className="assign-card-lg high">
            <div className="row-between">
              <b>Instagram Reel - Nike Air</b>
              <span className="due">Due in 2 days</span>
            </div>

            <p>Create 60-second product showcase reel for Air Max</p>

            <p className="pay"><b>Payment:</b> $150</p>

            <button className="red-btn sm mt10">Upload</button>
          </div>
        </div>

        {/* ---- RIGHT PANEL ---- */}
        <div className="panel">
          <h3>Performance Trend</h3>
          <div className="chart-placeholder" />
        </div>

      </div>

    </div>
  );
}
