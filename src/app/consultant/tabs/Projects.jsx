"use client";

export default function Projects() {
  return (
    <div className="tab-wrap">
      <h1 className="tab-title">My Projects</h1>
      <p className="tab-sub">Projects you've won and currently managing</p>

      <div className="card-list">

        <div className="proj-card">
          <div className="proj-head">
            <h3>Nike Summer Campaign</h3>
            <span className="badge active">Active</span>
          </div>

          <p className="proj-desc">
            Managing influencer content for Nike’s Summer launch across Instagram & TikTok.
          </p>

          <div className="proj-info">
            <div><small>Content Type</small><b>Short Video</b></div>
            <div><small>Creators Assigned</small><b>12</b></div>
            <div><small>Budget</small><b>$4,800</b></div>
            <div><small>Due</small><b>Jun 30, 2026</b></div>
          </div>

          <button className="btn-primary mt10">Manage Project</button>
        </div>

        <div className="proj-card">
          <div className="proj-head">
            <h3>Adidas Ultraboost Reviews</h3>
            <span className="badge review">In Review</span>
          </div>

          <p className="proj-desc">
            Product review campaign focused on sneaker comfort, styling & running use-case.
          </p>

          <div className="proj-info">
            <div><small>Creators</small><b>8</b></div>
            <div><small>Budget</small><b>$3,200</b></div>
            <div><small>Due</small><b>Completed</b></div>
          </div>

          <button className="btn-secondary mt10">View Submissions</button>
        </div>

      </div>
    </div>
  );
}
