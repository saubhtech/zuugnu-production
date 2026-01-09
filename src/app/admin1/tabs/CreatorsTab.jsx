"use client";

export default function CreatorsTab() {
  return (
    <div className="creators-container">

      <h1 className="page-title">Creator Management</h1>
      <p className="page-sub">Manage UGC creators and their performance</p>

      <div className="creator-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search creators..." />
        </div>

        <button className="invite-btn">
          👥 Invite Creator
        </button>
      </div>

      <div className="creators-table">
        <table>
          <thead>
            <tr>
              <th>Creator</th>
              <th>Contact</th>
              <th>Assignments</th>
              <th>Earnings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <b>Sarah Chen</b>
                <div className="mini-sub">ID: CRE-001</div>
              </td>

              <td>
                sarah.chen@mail.com
                <div className="mini-sub">Instagram, YouTube</div>
              </td>

              <td>8 Active / 42 Completed</td>

              <td>$3,240</td>

              <td><span className="status active">Active</span></td>

              <td>
                <span className="action">Edit</span>{" "}
                <span className="action danger">Suspend</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
