"use client";


export default function PerformanceTab() {
  return (
    <div className="creator-tab-wrap">
      <h1 className="page-title">Performance Analytics</h1>
      <p className="page-sub">Approval rates, completion stats & payout efficiency</p>

      <div className="stat-grid">
        <div className="perf-card">
          <small>Total Submissions</small>
          <h2>48</h2>
          <p className="green-mini">+5 this month</p>
        </div>

        <div className="perf-card">
          <small>Approval Rate</small>
          <h2 className="green">96%</h2>
          <p className="muted">High approval</p>
        </div>

        <div className="perf-card">
          <small>On-Time Completion</small>
          <h2>90%</h2>
          <p className="muted">Deadline efficiency</p>
        </div>

        <div className="perf-card">
          <small>Avg Payout / Task</small>
          <h2>$105</h2>
          <p className="muted">Based on last 10</p>
        </div>
      </div>

      <div className="panel big mt20">
        <h3>Submission Trend</h3>
        <div className="chart-placeholder big" />
      </div>

      <div className="panel big">
        <h3>Content Format Performance</h3>
        <div className="chart-placeholder big" />
      </div>
    </div>
  );
}
