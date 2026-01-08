"use client";

export default function ContentApprovalsTab() {
  return (
    <div>
      <h1 className="page-title">Content Approvals</h1>

      <table className="nice-table">
        <thead>
          <tr>
            <th>Title</th><th>Project</th><th>Consultant</th><th>Creator</th><th>Status</th><th>Date</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Instagram Reel - Air Max</td>
            <td>Nike Summer Campaign</td>
            <td>John Smith</td>
            <td>Sarah Chen</td>
            <td><span className="badge-pending">Pending Your Approval</span></td>
            <td>Jan 8, 2026</td>
            <td><span className="link">Review</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
