"use client";

export default function MyProjectsTab() {
  return (
    <div>
      <h1 className="page-title">My Projects</h1>
      <button className="primary-btn">+ Post Project</button>

      <div className="project-card">
        <h3>Nike Summer Campaign 2026 <span className="badge-active">Active</span></h3>
        <div className="muted">Instagram Posts + Youtube Videos + Reviews</div>

        <div className="detail-row">
          <span>Budget: <b>$5,000</b></span>
          <span>Escrow: <b className="green">$5,000</b></span>
          <span>Consultant: <b>John Smith</b></span>
          <span>Progress: <b>65%</b></span>
          <span>Deadline: <b>Jan 20, 2026</b></span>
        </div>
      </div>
    </div>
  );
}
