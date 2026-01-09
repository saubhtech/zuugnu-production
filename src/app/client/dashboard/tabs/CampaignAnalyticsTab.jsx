"use client";

export default function CampaignAnalyticsTab() {
  return (
    <div className="analytics-wrap">

      {/* HEADER */}
      <div className="analytics-header">
        <h1>Campaign Analytics</h1>
        <p className="sub">Track the performance and ROI of your campaigns</p>
      </div>

      {/* STATS OVERVIEW */}
      <div className="analytics-stats">
        <div className="stat-tile">
          <small>Total Reach</small>
          <h2>2.4M</h2>
          <span className="green">↑ 35%</span>
        </div>

        <div className="stat-tile">
          <small>Total Engagement</small>
          <h2>180K</h2>
          <span className="green">↑ 28%</span>
        </div>

        <div className="stat-tile">
          <small>Engagement Rate</small>
          <h2>7.5%</h2>
          <span className="green">High performance</span>
        </div>

        <div className="stat-tile">
          <small>Campaign ROI</small>
          <h2 className="green">+120%</h2>
          <span className="muted">Estimated</span>
        </div>
      </div>

      {/* GRID PANELS */}
      <div className="analytics-grid">

        {/* TREND GRAPH */}
        <div className="analytics-panel">
          <div className="panel-header">
            <h3>Reach & Engagement Trend</h3>
          </div>
          <div className="chart-placeholder-big">
            📈 Line Chart (Reach + Engagement Trend)
          </div>
        </div>

        {/* CONTENT TYPE GRAPH */}
        <div className="analytics-panel">
          <div className="panel-header">
            <h3>Content Type Performance</h3>
          </div>
          <div className="chart-placeholder-big">
            📊 Bar Chart (Reels, UGC Clips, Blog Posts, Reviews)
          </div>
        </div>

      </div>

      {/* TOP PERFORMING CONTENT */}
      <div className="analytics-panel full">
        <div className="panel-header">
          <h3>Top Performing Content</h3>
        </div>

        <div className="content-list">

          <div className="content-row">
            <div className="thumb-box">
              <div className="thumb-placeholder">🎬</div>
            </div>
            <div className="content-info">
              <div className="title">Nike Air Max: Ready to Fly High</div>
              <div className="sub">Instagram Reel · Consultant: John Smith</div>
            </div>
            <div className="metrics">
              <b>80K Reach</b>
              <span className="green">9.2% Eng Rate</span>
            </div>
          </div>

          <div className="content-row">
            <div className="thumb-box">
              <div className="thumb-placeholder">📝</div>
            </div>
            <div className="content-info">
              <div className="title">The Future of Running: Adidas Ultraboost</div>
              <div className="sub">Blog Review · Consultant: Sarah Lee</div>
            </div>
            <div className="metrics">
              <b>120K Reach</b>
              <span className="green">7.8% Eng Rate</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
