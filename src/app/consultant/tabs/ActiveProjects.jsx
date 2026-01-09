"use client";

export default function ActiveProjects() {
  return (
    <div className="active-container">

      <h1 className="active-title">Active Projects</h1>
      <p className="active-sub">Projects you are currently managing</p>

      <div className="project-card">
        
        <div className="proj-header">
          <h3>Nike Summer Campaign</h3>
          <span className="proj-status">In Progress</span>
        </div>

        <div className="proj-stats">
          <div className="stat-box">
            <small>Assigned</small>
            <h2>12</h2>
            <span className="mini">Creators</span>
          </div>

          <div className="stat-box green-bg">
            <small>Submitted</small>
            <h2 className="green">28</h2>
            <span className="mini">Contents</span>
          </div>

          <div className="stat-box yellow-bg">
            <small>Pending</small>
            <h2 className="yellow">8</h2>
            <span className="mini">Approvals</span>
          </div>

          <div className="stat-box purple-bg">
            <small>Escrow</small>
            <h2 className="purple">$5,000</h2>
          </div>
        </div>

        <div className="divider"></div>

        <h4 className="sub-head">Recent Submissions for Review</h4>

        {/* Submission item */}
        <div className="review-item">
          <div className="item-left">
            <div className="thumb" />
            <div>
              <b>Summer Vibes Instagram Post</b>
              <p className="muted">by Sarah Chen · 2 hours ago</p>
            </div>
          </div>
          <span className="review-btn">Review</span>
        </div>

        <div className="review-item">
          <div className="item-left">
            <div className="thumb" />
            <div>
              <b>Nike Air Max: Ready to Fly High</b>
              <p className="muted">by David Lee · 1 day ago</p>
            </div>
          </div>
          <span className="review-btn">Review</span>
        </div>

      </div>
    </div>
  );
}
