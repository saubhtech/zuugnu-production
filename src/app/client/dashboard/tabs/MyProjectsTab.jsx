"use client";

export default function MyProjectsTab() {
  return (
    <div className="my-projects-wrap">

      {/* TITLE + ACTION */}
      <div className="projects-header">
        <h1>My Projects</h1>
        <button className="post-btn">+ Post Project</button>
      </div>

      {/* PROJECT CARD 1 */}
      <div className="project-card">
        <div className="card-top">
          <h3 className="proj-title">Nike Summer Campaign 2026</h3>
          <span className="badge-active">Active</span>
        </div>

        <div className="proj-sub">Instagram Posts + YouTube Videos + Reviews</div>

        <div className="proj-grid">
          <div>
            <small>Budget</small>
            <p className="bold">$5,000</p>
          </div>

          <div>
            <small>Escrow</small>
            <p className="bold green">$5,000</p>
          </div>

          <div>
            <small>Consultant</small>
            <p className="bold">John Smith</p>
          </div>

          <div>
            <small>Progress</small>
            <div className="progress-wrap">
              <div className="progress-bar" style={{width:"65%"}}></div>
              <span>65%</span>
            </div>
          </div>

          <div>
            <small>Deadline</small>
            <p className="bold">Jan 20, 2026</p>
          </div>
        </div>

        <div className="proj-meta-row">
          <span>👥 12 Creators</span>
          <span>🗂️ 28 Contents</span>
          <span>✔ 18 Approved</span>
        </div>

        <div className="proj-footer">
          <span className="view-link">View Details →</span>
        </div>
      </div>

      {/* PROJECT CARD 2 */}
      <div className="project-card">
        <div className="card-top">
          <h3 className="proj-title">Adidas Brand Awareness Campaign</h3>
          <span className="badge-pending">Pending Bids</span>
        </div>

        <div className="proj-sub">Social Media Posts + Articles + Reviews</div>

        <div className="proj-grid">
          <div>
            <small>Budget</small>
            <p className="bold">$8,500</p>
          </div>

          <div>
            <small>Escrow</small>
            <p className="bold yellow">$8,500</p>
          </div>

          <div>
            <small>Consultant</small>
            <p className="bold">-</p>
          </div>

          <div>
            <small>Bids</small>
            <p className="bold">3 proposals</p>
          </div>

          <div>
            <small>Deadline</small>
            <p className="bold">Feb 15, 2026</p>
          </div>
        </div>

        <div className="proj-meta-row">
          <span>🎯 Target Reach: 1M</span>
          <span>⭐ Average Rating: 4.8</span>
        </div>

        <div className="proj-footer">
          <span className="view-link">View Bids →</span>
        </div>
      </div>
    </div>
  );
}
