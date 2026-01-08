"use client";

export default function ActiveAssignmentsTab() {
  return (
    <div>
      <h1 className="page-title">Active Assignments</h1>
      <p className="page-sub">Monitor creator submissions & deadlines</p>

      <table className="nice-table">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Creator</th>
            <th>Platform</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Payout</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Instagram Reel - Nike Air</td>
            <td>Sarah Chen</td>
            <td>Instagram</td>
            <td>Jan 14</td>
            <td><span className="badge pending">Pending</span></td>
            <td>$150</td>
          </tr>

          <tr>
            <td>Youtube Review - Adidas Boost</td>
            <td>John Lee</td>
            <td>YouTube</td>
            <td>Jan 18</td>
            <td><span className="badge review">Reviewing</span></td>
            <td>$250</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
