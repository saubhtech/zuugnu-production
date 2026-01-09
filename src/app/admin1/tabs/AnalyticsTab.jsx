"use client";

export default function AnalyticsTab() {
  return (
    <div className="analytics-wrap">

      <h1 className="page-title">Platform Analytics</h1>
      <p className="page-sub">
        Deep dive into platform performance and user engagement
      </p>

      <div className="analytics-top">
        <select className="analytics-filter">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last 12 Months</option>
        </select>

        <button className="export-btn">📥 Export Report</button>
      </div>

      {/* Top Charts */}
      <div className="analytics-charts">
        <div className="chart-card">
          <h3>User Growth Overview</h3>
          <div className="chart-placeholder line-chart">
            📈 Line Chart Placeholder
          </div>
        </div>

        <div className="chart-card">
          <h3>Content Status Distribution</h3>
          <div className="chart-placeholder donut-chart">
            🍩 Distribution Placeholder
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="analytics-lower">
        
        {/* Top Performing Consultants */}
        <div className="consultants-card">
          <h3>Top Performing Consultants</h3>

          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Consultant</th>
                <th>Completed</th>
                <th>Rating</th>
                <th>Earnings</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>John Smith</td>
                <td>15</td>
                <td>⭐ 4.9</td>
                <td className="green">$12,400</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Sarah Lee</td>
                <td>12</td>
                <td>⭐ 4.8</td>
                <td className="green">$10,180</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Activity Log */}
        <div className="activity-log-card">
          <h3>User Activity Log</h3>

          <div className="log-item">
            <span className="log-icon info">ℹ️</span>
            <div className="log-text">
              <b>Admin User logged in</b>
              <div className="mini-sub">10 min ago</div>
            </div>
          </div>

          <div className="log-item">
            <span className="log-icon critical">⚠️</span>
            <div className="log-text">
              <b>System Error: Payments Gateway API failed</b>
              <div className="mini-sub">25 min ago</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
