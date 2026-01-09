"use client";

export default function PerformanceTab() {
  return (
    <div className="creator-tab-wrap">

      {/* PAGE HEADER */}
      <h1 className="page-title">Performance Analytics</h1>
      <p className="page-sub">Approval rates, completion stats & payout efficiency</p>

      {/* STATS ROW */}
      <div className="stat-grid mt20">
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

      {/* SUBMISSION TREND + CONTENT FORMAT GRID */}
      <div className="grid-2 mt30">

        {/* LINE GRAPH */}
        <div className="panel big">
          <div className="panel-header">
            <h3>Submission Trend</h3>
          </div>
          <div className="chart-placeholder-line">
            📈 Line Graph Loading...
          </div>
        </div>

        {/* PIE / DONUT CHART */}
        <div className="panel big">
          <div className="panel-header">
            <h3>Content Format Performance</h3>
          </div>
          <div className="chart-placeholder-donut">
            🍩 Pie Chart Loading...
          </div>

        </div>
      </div>

      {/* FEEDBACK SECTION */}
      <div className="panel big mt30">
        <div className="panel-header">
          <h3>Feedback from Consultants</h3>
        </div>

        <div className="feedback-item positive">
          <div className="feedback-icon blue">📝</div>
          <div className="feedback-main">
            <p className="fb-text">“Excellent work on the Nike Reel, clean brand fit”</p>
            <small className="muted">
              John Smith (Consultant) • Project: Nike Summer Campaign
            </small>
          </div>
          <span className="fb-tag green">Positive</span>
        </div>

        <div className="feedback-item warn">
          <div className="feedback-icon yellow">⚠️</div>
          <div className="feedback-main">
            <p className="fb-text">“Adjust the color palette slightly for brand consistency”</p>
            <small className="muted">
              Sarah Lee (Consultant) • Project: Eco-Friendly Fashion
            </small>
          </div>
          <span className="fb-tag orange">Revision</span>
        </div>
      </div>
    </div>
  );
}
