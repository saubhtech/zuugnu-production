"use client";

export default function Analytics() {
  return (
    <div className="analytics-container">

      <h1 className="analytics-title">My Analytics</h1>
      <p className="analytics-sub">
        Performance metrics for your projects and creators
      </p>

      {/* Filters + Export */}
      <div className="analytics-top">
        <select className="analytics-select">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>

        <button className="export-button">
          📁 Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="analytics-cards">

        <div className="analytics-card">
          <small>Total Projects</small>
          <h2>15</h2>
          <p className="mini green">+2 this month</p>
        </div>

        <div className="analytics-card">
          <small>Success Rate</small>
          <h2 className="green">92%</h2>
          <p className="mini">Content approvals</p>
        </div>

        <div className="analytics-card">
          <small>Total Creators Managed</small>
          <h2>28</h2>
          <p className="mini">Active pool</p>
        </div>

        <div className="analytics-card">
          <small>Average Project Budget</small>
          <h2>$4,500</h2>
          <p className="mini">Your portfolio</p>
        </div>

      </div>

      {/* Graphs */}
      <div className="analytics-graphs">

        <div className="analytics-graph-box">
          <h3>Project Progress Over Time</h3>
          <div className="graph-placeholder">
            {/* Insert chart library later */}
          </div>
        </div>

        <div className="analytics-graph-box">
          <h3>Creator Performance (Submissions)</h3>
          <div className="graph-placeholder">
            {/* Insert chart library later */}
          </div>
        </div>

      </div>

    </div>
  );
}
