"use client";

export default function QueueTab() {
  return (
    <div className="queue-wrap">

      <h1 className="page-title">Approval Queue</h1>
      <p className="page-sub">
        Review content submissions and approval requests in the pipeline
      </p>

      <div className="queue-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search approvals..." />
        </div>

        <select className="queue-filter">
          <option>Pending Consultant Approval</option>
          <option>Pending Client Approval</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="queue-table">
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Creator</th>
              <th>Consultant</th>
              <th>Client</th>
              <th>Current Status</th>
              <th>Submitted On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Row 1 */}
            <tr>
              <td>
                <b>Instagram Reel - Air Max</b>
                <div className="mini-sub">
                  Project: Nike Summer Campaign
                </div>
              </td>
              <td>Sarah Chen</td>
              <td>John Smith</td>
              <td>Nike Inc.</td>
              <td><span className="status pending">Pending Consultant</span></td>
              <td>Jan 7, 2026</td>
              <td>
                <span className="action">View Content</span>
                <span className="menu">⋮</span>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td>
                <b>YouTube Video - Ultraboost Review</b>
                <div className="mini-sub">
                  Project: Adidas Awareness
                </div>
              </td>
              <td>Mike Davis</td>
              <td>Sarah Lee</td>
              <td>Adidas AG</td>
              <td><span className="status pending">Pending Client</span></td>
              <td>Jan 5, 2026</td>
              <td>
                <span className="action">View Content</span>
                <span className="menu">⋮</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
