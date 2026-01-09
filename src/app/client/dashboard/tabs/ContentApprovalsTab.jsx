"use client";

export default function ContentApprovalsTab() {
  return (
    <div className="content-approvals-wrap">

      {/* HEADER */}
      <div className="approvals-header">
        <h1>Content Approvals</h1>

        <select className="filter-select">
          <option>All Projects</option>
          <option>Nike Summer Campaign</option>
          <option>Adidas Brand Campaign</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="approvals-table">
        <thead>
          <tr>
            <th>Content Title</th>
            <th>Project</th>
            <th>Consultant</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* ROW 1 */}
          <tr>
            <td>
              <div className="title-main">Instagram Reel - Air Max</div>
              <div className="title-sub">Platform: Instagram</div>
            </td>

            <td>Nike Summer Campaign</td>
            <td>John Smith</td>
            <td>Sarah Chen</td>

            <td className="pending-text">Pending Your Approval</td>

            <td>Jan 8, 2026</td>
            <td><span className="action-link">Review</span></td>
          </tr>

          {/* ROW 2 */}
          <tr>
            <td>
              <div className="title-main">Blog Post - Running Tech</div>
              <div className="title-sub">Platform: Medium</div>
            </td>

            <td>Nike Summer Campaign</td>
            <td>John Smith</td>
            <td>David Lee</td>

            <td className="approved-text">Approved</td>

            <td>Jan 6, 2026</td>
            <td><span className="action-link">View</span></td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}
