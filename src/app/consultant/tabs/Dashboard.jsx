"use client";

export default function DashboardTab() {
  return (
    <div className="dash-container">
      <h1 className="dash-title">Consultant Dashboard</h1>
      <p className="dash-sub">Manage projects and creator teams</p>

      {/* ===== Stats Row ===== */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="icon purple">📋</div>
          <small>Active Projects</small>
          <h2>5</h2>
          <p className="mini">1 awaiting client approval</p>
        </div>

        <div className="stat-card">
          <div className="icon green">💵</div>
          <small>In Escrow</small>
          <h2 className="green">$18,500</h2>
          <p className="mini">Ready for release</p>
        </div>

        <div className="stat-card">
          <div className="icon yellow">📑</div>
          <small>Pending Bids</small>
          <h2>3</h2>
          <p className="mini">Awaiting client review</p>
        </div>

        <div className="stat-card">
          <div className="icon blue">👤</div>
          <small>My Creators</small>
          <h2>28</h2>
          <p className="mini green">25 active</p>
        </div>

        <div className="stat-card">
          <div className="icon pink">📈</div>
          <small>This Month Earnings</small>
          <h2>$12.4K</h2>
          <p className="mini green">+10%</p>
        </div>
      </div>

      {/* ===== MAIN GRID (Left + Right) ===== */}
      <div className="main-grid">
        {/* LEFT: ACTIVE PROJECTS */}
        <div className="panel">
          <h3>Active Projects</h3>

          <div className="proj-card">
            <div className="proj-top">
              <b>Nike Summer Campaign</b>
              <span className="badge progress">In Progress</span>
            </div>

            <div className="proj-details">
              <div>
                <small>Budget</small>
                <p>$5,000</p>
              </div>
              <div>
                <small>Creators</small>
                <p>12 assigned</p>
              </div>
              <div>
                <small>Progress</small>
                <p>65%</p>
              </div>
              <div>
                <small>Due</small>
                <p>12 days</p>
              </div>
            </div>

            <div className="progress-bar purple">
              <div style={{ width: "65%" }} />
            </div>
          </div>

          <div className="proj-card">
            <div className="proj-top">
              <b>Google Review Blitz for new product</b>
              <span className="badge progress">In Progress</span>
            </div>

            <div className="proj-details">
              <div>
                <small>Budget</small>
                <p>$2,500</p>
              </div>
              <div>
                <small>Creators</small>
                <p>8 assigned</p>
              </div>
              <div>
                <small>Progress</small>
                <p>80%</p>
              </div>
              <div>
                <small>Due</small>
                <p>5 days</p>
              </div>
            </div>

            <div className="progress-bar blue">
              <div style={{ width: "80%" }} />
            </div>
          </div>
        </div>

        {/* RIGHT: EARNINGS OVERVIEW */}
        <div className="panel earnings-panel">
  <h3>Earnings Overview</h3>

  <div className="earn-chart-placeholder line-graph">
    <svg viewBox="0 0 200 80" preserveAspectRatio="none">
      <polyline 
        fill="none" 
        stroke="#7c3aed" 
        strokeWidth="2"
        points="0,60 30,40 60,50 90,20 120,35 150,10 180,25 200,5"
        strokeLinecap="round"
      />
    </svg>
    <p className="chart-value">$14,000</p>
  </div>
</div>

      </div>
    </div>
  );
}
