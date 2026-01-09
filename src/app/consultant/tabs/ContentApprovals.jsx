"use client";

export default function ContentApprovals() {
  return (
    <div className="approvals-container">

      <h1 className="approvals-title">Content Approvals</h1>
      <p className="approvals-sub">Review creator content and submit to clients</p>

      {/* Filters row */}
      <div className="approvals-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search content..." />
        </div>

        <select className="status-select">
          <option>Pending My Review</option>
          <option>Pending Client</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Layout line */}
      <div className="layout-line"></div>

      {/* Table */}
      <div className="approvals-table">
        <table>
          <thead>
            <tr>
              <th>Content Title</th>
              <th>Project</th>
              <th>Creator</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Submitted On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* Row 1 */}
            <tr>
              <td>
                <b>Summer Vibes Instagram Post</b>
                <div className="mini-label">Assignment: IG Post</div>
              </td>
              <td>Nike Summer Campaign</td>
              <td>Sarah Chen</td>
              <td className="platform-cell">
                <span className="platform-icon">📸</span>
                Instagram
              </td>
              <td><span className="status pending-me">Pending My Review</span></td>
              <td>Jan 8, 2026</td>
              <td><span className="action-link">Review Content</span></td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td>
                <b>New Product Review - Trustpilot</b>
                <div className="mini-label">Assignment: Trustpilot Review</div>
              </td>
              <td>Eco-Friendly Product Launch</td>
              <td>Emily White</td>
              <td className="platform-cell">
                <span className="platform-icon">⭐</span>
                Trustpilot
              </td>
              <td><span className="status pending-client">Pending Client</span></td>
              <td>Jan 7, 2026</td>
              <td><span className="action-link">View Content</span></td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
