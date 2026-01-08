export default function OverviewTab() {
  return (
    <div className="overview">
      <div className="stats-grid">
        <div className="stat-box">
          <p className="stat-label">Total Content Published</p>
          <h2 className="stat-value">342</h2>
          <span className="stat-sub">+23 this month</span>
        </div>

        <div className="stat-box">
          <p className="stat-label">Total Engagement</p>
          <h2 className="stat-value">45.2K</h2>
          <span className="stat-sub">+12.5% vs last period</span>
        </div>

        <div className="stat-box">
          <p className="stat-label">Average Rating</p>
          <h2 className="stat-value">4.8 ⭐</h2>
          <span className="stat-sub">Based on 1,247 reviews</span>
        </div>

        <div className="stat-box">
          <p className="stat-label">Total Reach</p>
          <h2 className="stat-value">234K</h2>
          <span className="stat-sub">+8.3% vs last period</span>
        </div>
      </div>

      <div className="panel-row">
        <div className="panel engagement-panel">
          <div className="panel-header">
            <h3>Engagement Trends</h3>
            <a>View Details</a>
          </div>
          <div className="placeholder-chart">📈 Chart Placeholder</div>
        </div>

        <div className="panel distribution-panel">
          <h3>Content Distribution</h3>
          <div className="placeholder-donut">🥧 Donut Placeholder</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Recent Publications</h3>
          <a>View All Content</a>
        </div>

        <div className="publication-grid">
          <div className="pub-card">
            <span className="tag linkedin">LinkedIn</span>
            <h4>Introducing our AI-powered analytics platform</h4>
            <div className="pub-meta">💬 1,834 | 🔁 234 | ❤️ 156</div>
          </div>

          <div className="pub-card">
            <span className="tag facebook">Facebook</span>
            <h4>Customer success: ROI boosted by 150%</h4>
            <div className="pub-meta">💬 2,341 | 🔁 445 | ❤️ 267</div>
          </div>

          <div className="pub-card">
            <span className="tag instagram">Instagram</span>
            <h4>Behind the scenes at TechCorp HQ</h4>
            <div className="pub-meta">💬 5,678 | 🔁 890 | ❤️ 423</div>
          </div>
        </div>
      </div>
    </div>
  );
}
