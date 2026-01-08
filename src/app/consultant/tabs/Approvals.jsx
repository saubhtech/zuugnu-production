"use client";

export default function ReviewApprovalsTab() {
  return (
    <div>
      <h1 className="page-title">Review & Approvals</h1>
      <p className="page-sub">Approve creator submissions before brand publish</p>

      <table className="nice-table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Creator</th>
            <th>Project</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Reel - Nike Air Max</td>
            <td>Sarah Chen</td>
            <td>Nike Summer Campaign</td>
            <td><span className="badge review">In Review</span></td>
            <td>Jan 8</td>
            <td><span className="link-btn">Open</span></td>
          </tr>

          <tr>
            <td>Youtube Review</td>
            <td>John Lee</td>
            <td>Adidas Boost Launch</td>
            <td><span className="badge pending">Pending Brand</span></td>
            <td>Jan 6</td>
            <td><span className="link-btn">Open</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
